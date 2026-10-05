import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'darb_al_istidama_uae_smart_city_secure_jwt_2026';

// In-memory demo user repository with pre-hashed passwords
interface UserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'USER' | 'ADMIN' | 'GOVERNMENT' | 'CORPORATE';
  organization?: string;
  greenPoints: number;
  streakDays: number;
}

// Generate demo users
const USERS: UserAccount[] = [
  {
    id: 'user-001',
    name: 'Fatima Al Mansoori',
    email: 'resident@darbalistidama.ae',
    // bcrypt hash of 'DarbUAE2026!'
    passwordHash: bcrypt.hashSync('DarbUAE2026!', 10),
    role: 'USER',
    greenPoints: 1280,
    streakDays: 7
  },
  {
    id: 'gov-001',
    name: 'Eng. Rashid Al Nuaimi',
    email: 'dmt.planner@abudhabi.gov.ae',
    passwordHash: bcrypt.hashSync('AbuDhabiNetZero!', 10),
    role: 'GOVERNMENT',
    organization: 'Abu Dhabi Department of Municipalities and Transport (DMT)',
    greenPoints: 2450,
    streakDays: 14
  },
  {
    id: 'corp-001',
    name: 'Sara Al Zaabi',
    email: 'hr.sustainability@adgm-demo.ae',
    passwordHash: bcrypt.hashSync('CorporateUAE2026!', 10),
    role: 'CORPORATE',
    organization: 'Abu Dhabi Global Market Corp Partner',
    greenPoints: 1980,
    streakDays: 10
  }
];

// Login Endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: { message: 'Email and password are required', code: 'MISSING_CREDENTIALS' }
      });
      return;
    }

    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials entered', code: 'INVALID_CREDENTIALS' }
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials entered', code: 'INVALID_CREDENTIALS' }
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        greenPoints: user.greenPoints,
        streakDays: user.streakDays
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { message: 'Authentication process failed', code: 'AUTH_ERROR' }
    });
  }
});

// Register Endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'USER' } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        error: { message: 'Name, email and password are required', code: 'MISSING_FIELDS' }
      });
      return;
    }

    const existing = USERS.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      res.status(409).json({
        success: false,
        error: { message: 'An account with this email already exists', code: 'USER_EXISTS' }
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: role === 'GOVERNMENT' || role === 'CORPORATE' ? role : 'USER',
      greenPoints: 100, // Welcome bonus
      streakDays: 1
    };

    USERS.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        greenPoints: newUser.greenPoints,
        streakDays: newUser.streakDays
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { message: 'Registration failed', code: 'REGISTRATION_ERROR' }
    });
  }
});

// Current Profile verify endpoint
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: { message: 'No authorization token provided' } });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = USERS.find(u => u.id === decoded.id);
    if (!user) {
      res.status(404).json({ success: false, error: { message: 'User not found' } });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        greenPoints: user.greenPoints,
        streakDays: user.streakDays
      }
    });
  } catch (err) {
    res.status(401).json({ success: false, error: { message: 'Token is invalid or expired' } });
  }
});

export default router;
