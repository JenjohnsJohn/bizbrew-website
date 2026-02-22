import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLogin() {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(tokenInput);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid token. Please try again.');
      }
    } catch {
      setError('Failed to verify token. Is the API running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bizbrew-charcoal flex items-center justify-center px-6">
      <Card className="w-full max-w-md bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-bizbrew-offwhite font-display text-2xl">
            Admin Login
          </CardTitle>
          <CardDescription className="text-bizbrew-text-secondary">
            Enter your admin token to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token" className="text-bizbrew-text-secondary">
                Admin Token
              </Label>
              <Input
                id="token"
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter your admin token"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite placeholder:text-bizbrew-text-secondary/50"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || !tokenInput}
              className="w-full bg-bizbrew-amber text-bizbrew-charcoal hover:bg-bizbrew-amber/90"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
