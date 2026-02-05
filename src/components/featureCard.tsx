import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-brand-card p-8 rounded-3xl border border-brand-border hover:border-brand-accent/50 transition-all group"
        >
            <div className="w-14 h-14 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className='w-7 h-7 text-brand-accent'/>
            </div>
            <h3 className="text-xl text-white font-bold mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </motion.div>
    );
};

export default FeatureCard;