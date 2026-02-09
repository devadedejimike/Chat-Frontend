import { SignIn, SignUp } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            const {data} = isLogin ? await SignIn({username: formData.username, password: formData.password}) : await SignUp(formData);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));

            alert(isLogin ? "Welcome Back" : "Account Created Successfully");
            navigate('/chat');
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong";
            alert(message);
        } finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-brand-accent/10 blur-[120px] rounded-full -z-10"/>
            <motion.div
                initial={{opacity:0 , y:20}}
                animate={{opacity:1 , y:0}}
                className="w-full max-w-md"
            >
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 rounded-lg bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/20 mb-4">
                            <MessageCircle className="w-7 h-7 text-white"/>
                        </div>
                        <h1 className="font-bold text-2xl text-white">{isLogin ? "Welcome Back!" : "Create an Account"}</h1>
                        <p className="text-slate-400 mt-2 text-sm">{isLogin ? "Enter your details to access your chat" : "Join thousands of users communicating daily"}</p>
                    </div>

                    <div className="bg-brand-card p-8 rounded-auth border border-brand-border shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2 overflow-hidden">
                                <label className="text-sm text-slate-300 font-medium">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input 
                                        type="text"
                                        name="username"
                                        placeholder="johndoe"
                                        onChange={(e) => 
                                            setFormData({...formData, username: e.target.value})
                                        }
                                        required={!isLogin}
                                        className="w-full rounded-xl bg-brand-dark py-3 pr-4 pl-11 border border-brand-border text-white focus:border-brand-accent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <AnimatePresence>
                                {!isLogin && (<motion.div 
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    exit={{opacity: 0, height: 0}}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-slate-300 text-sm font-medium">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3  top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                        <input 
                                            type="email"
                                            name="email"
                                            placeholder="name@gmail.com"
                                            onChange={(e) => {
                                                setFormData({...formData, email: e.target.value});
                                            }}
                                            required={!isLogin}
                                            className="w-full rounded-xl bg-brand-dark py-3 pr-4 pl-11 border border-brand-border text-white focus:border-brand-accent outline-none transition-all"
                                        />
                                    </div>
                                </motion.div>)}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm font-medium">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3  top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                    <input 
                                        type={showPassword ? "text":"password"}
                                        name="password"
                                        placeholder="••••••••"
                                        onChange={(e) => {
                                            setFormData({...formData, password: e.target.value});
                                        }}
                                        required={!isLogin}
                                        className="w-full rounded-xl bg-brand-dark py-3 pr-4 pl-11 border border-brand-border text-white focus:border-brand-accent outline-none transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                        {!showPassword ? <Eye /> : <EyeOff/>}
                                    </button>
                                </div>
                            </div>
                            <AnimatePresence>
                                {!isLogin && (<motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-slate-300 text-sm font-medium">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3  top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                        <input 
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            onChange={(e) => {
                                                setFormData({...formData, confirmPassword: e.target.value});
                                            }}
                                            required={!isLogin}
                                            className="w-full rounded-xl bg-brand-dark py-3 pr-4 pl-11 border border-brand-border text-white focus:border-brand-accent outline-none transition-all"
                                        />
                                    </div>
                                </motion.div>)}
                            </AnimatePresence>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                icon={ArrowRight} 
                                isLoading={isLoading}
                                className="w-full rounded-2xl py-4 mt-2"
                            >
                                {isLogin ? "Sign In" : "Register"}
                            </Button>

                            <div className="text-center mt-8">
                                <p className="text-sm text-slate-400">{isLogin ? "Don't have an account yet? " : "Already have an account? "}
                                    <button 
                                        type="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-brand-accent font-semibold hover:underline"
                                        >{isLogin ? "Create one" : "Log in"}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
        </div>
    );
};

export default AuthPage;