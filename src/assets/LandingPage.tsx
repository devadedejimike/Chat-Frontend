import { motion } from 'framer-motion';
import Button from '../components/button';
import FeatureCard from '../components/featureCard';
import { MessageCircle, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Zap,
      title: 'Real-time Messaging',
      description: 'Instant message delivery with typing indicators and read receipts.',
    },
    {
      icon: Users,
      title: 'Group Chats',
      description: 'Create groups with unlimited members and manage them easily.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption keeps your conversations safe and private.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 font-sans selection:bg-brand-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/20">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ChatApp</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="rounded-lg" onClick={() => navigate('/auth')}>
              Sign in
            </Button>
            <Button variant="primary" onClick={() => navigate('/auth')} className="rounded-lg">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accent/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
              </span>
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                v1.0 live soon
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
              Connect with anyone, <br />
              <span className="text-brand-accent">anywhere.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              A modern chat application built for speed. Experience real-time messaging, 
              secure file sharing, and seamless group collaborations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" onClick={() => navigate('/auth')} icon={ArrowRight} className="w-full sm:w-64 rounded-xl">
                Start chatting
              </Button>
              <Button variant="outline" className="w-full sm:w-64 rounded-xl">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 relative max-w-5xl mx-auto px-4 mb-32"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10 pointer-events-none" />
        
        <div className="bg-brand-card rounded-2xl shadow-2xl border border-brand-border overflow-hidden">
          <div className="flex">
            {/* Sidebar preview */}
            <div className="w-80 border-r border-brand-border p-4 hidden md:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded w-24 mb-1" />
                  <div className="h-3 bg-brand-border rounded w-16" />
                </div>
              </div>
              <div className="h-10 bg-brand-border/50 rounded-lg mb-4" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${i === 1 ? 'bg-brand-accent/10' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-brand-border" />
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700 rounded w-28 mb-1" />
                    <div className="h-3 bg-brand-border rounded w-36" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat preview */}
            <div className="flex-1 p-4 bg-brand-card/50">
              <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                <div className="w-10 h-10 rounded-full bg-brand-border" />
                <div>
                  <div className="h-4 bg-slate-700 rounded w-32 mb-1" />
                  <div className="h-3 bg-brand-border rounded w-16" />
                </div>
              </div>

              <div className="py-8 space-y-4">
                <div className="flex justify-start">
                  <div className="bg-brand-border rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                    <div className="h-4 bg-slate-600 rounded w-48 mb-2" />
                    <div className="h-4 bg-slate-600 rounded w-32" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-brand-accent rounded-2xl rounded-br-md px-4 py-3 max-w-xs shadow-lg shadow-brand-accent/20">
                    <div className="h-4 bg-white/30 rounded w-36 mb-2" />
                    <div className="h-4 bg-white/30 rounded w-48" />
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-brand-border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce [animation-delay:150ms]" />
                      <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <section className="py-24 bg-brand-card/30 border-y border-brand-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Built for modern communication</h2>
            <div className="h-1.5 w-20 bg-brand-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-xl mx-auto bg-brand-accent/5 border border-brand-accent/20 p-12 rounded-[3rem]">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Join thousands of users who are already enjoying seamless communication.
          </p>
          <Button 
            variant="primary" 
            icon={ArrowRight} 
            onClick={() => navigate('/auth')}
            className="mx-auto px-10 rounded-xl"
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-brand-accent" />
            <span className="font-bold text-white">ChatApp</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 ChatApp. All rights reserved. Built with ❤️ by DevMichael.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;