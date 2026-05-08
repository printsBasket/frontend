import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Printer } from 'lucide-react';
import SEO from '../common/SEO';
import howtochooseblog from "../../assets/howtochooseblog.jpg";
import importanttobuy from "../../assets/importanttobuy.jpg";
import inkjetvslaser from "../../assets/inkjetvslaser.jpg";
import tipstoextendblog from "../../assets/tipstoextendblog.jpg";
import understandingprintyields from "../../assets/understandingprintyields.jpg";
import printerguide1 from "../../assets/wirelesssblogs.jpg";

const BlogsMain = () => {
    // New 6 blogs for 2026
    const blogs = [
        {
            id: 1,
            title: "How to Choose the Right Printer for Your Home or Office: The Complete 2026 Buying Guide",
            excerpt: "Selecting the right printer for your home or office can feel overwhelming with so many options available. This complete 2026 guide walks you through essential factors, printer types, and expert recommendations to help you make the perfect choice.",
            date: "January 26, 2026",
            image: howtochooseblog,
            slug: "how-choose-right-printer-2026-guide",
            category: "Buying Guide"
        },
        {
            id: 2,
            title: "Inkjet vs. Laser Printers: What's the Difference and Which One Fits Your Needs in 2026?",
            excerpt: "Should you buy an inkjet or laser printer? Learn the key differences between these two printer types, their advantages and disadvantages, and which one is best for your specific printing needs in 2026.",
            date: "January 26, 2026",
            image: inkjetvslaser,
            slug: "inkjet-vs-laser-printers-2026",
            category: "Comparison Guide"
        },
        {
            id: 3,
            title: "Understanding Print Yields: What Page Counts Really Mean for Everyday Users (2026 Guide)",
            excerpt: "Ever confused by terms like '150 pages' or '500 pages' on ink cartridges? Discover what page yields mean, how they're calculated, and how to choose cartridges that give you the best value in 2026.",
            date: "January 26, 2026",
            image: understandingprintyields,
            slug: "understanding-print-yields-page-counts-2026",
            category: "Technical Guide"
        },
        {
            id: 4,
            title: "Wireless Printing Made Easy: How Modern Printers Connect to Your Devices (2026 Guide)",
            excerpt: "Wireless printing has become essential in 2026. Learn how modern printers connect to your devices, setup instructions for different platforms, troubleshooting tips, and security best practices for wireless printing.",
            date: "January 26, 2026",
            image: printerguide1,
            slug: "wireless-printing-easy-modern-printers-2026",
            category: "Setup Guide"
        },
        {
            id: 5,
            title: "Tips to Extend the Life of Your Printer and Keep It Running Smoothly (2026 Guide)",
            excerpt: "A printer is an investment. Maximize its lifespan with our comprehensive guide to maintenance, cleaning tips, proper usage habits, and preventive care strategies that keep your printer performing like new.",
            date: "January 26, 2026",
            image: tipstoextendblog,
            slug: "tips-extend-printer-life-running-smoothly-2026",
            category: "Maintenance Guide"
        },
        {
            id: 6,
            title: "Why It's Important to Buy Printing Supplies from Trusted Retailers (2026 Guide)",
            excerpt: "Quality matters when buying printing supplies. Discover why trusted retailers matter, how to spot counterfeit cartridges, benefits of genuine products, and tips for finding the best deals on authentic supplies.",
            date: "January 26, 2026",
            image: importanttobuy,
            slug: "buy-printing-supplies-trusted-retailers-2026",
            category: "Shopping Guide"
        }
    ];

    return (
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/20 min-h-screen pt-24 pb-12">
            <SEO
                title="Blog - Printer Tips & Guides"
                description="Read expert articles on choosing printers, inkjet vs laser, print yields, wireless printing, and tips to extend your printer life."
                canonical="/blogs"
            />
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-4 uppercase tracking-tight">
                        Latest Insights & Guides
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto my-4"></div>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                        Expert advice, buying guides, and tips to help you get the most out of your printing experience.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {blogs.map((blog) => (
                        <article key={blog.id} className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl overflow-hidden shadow-lg shadow-blue-100/30 border-2 border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group backdrop-blur-sm">
                            {/* Image */}
                            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                                <Link to={`/blogs/${blog.slug}`}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        width="400"
                                        height="256"
                                    />
                                    <div className="absolute top-3 left-4 bg-gradient-to-r from-blue-600 to-blue-600 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-md">
                                        {blog.category}
                                    </div>
                                </Link>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6 md:p-8">
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {blog.date}
                                    </span>
                                    {/* <span className="flex items-center gap-1">
                                        <User size={14} /> {blog.author}
                                    </span> */}
                                </div>

                                <Link to={`/blogs/${blog.slug}`}>
                                    <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-sm font-medium">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    to={`/blogs/${blog.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest group-hover:gap-4 transition-all"
                                >
                                    Read Article <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}

                    {/* Placeholder for when you have more posts */}
                    {/* <div className="bg-slate-100 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            <Printer size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-500">More Coming Soon</h3>
                        <p className="text-slate-400 text-sm mt-2">Stay tuned for more printing tips and reviews.</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default BlogsMain;
