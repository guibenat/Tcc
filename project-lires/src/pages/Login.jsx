import Lires from '../assets/Lires.png'

export default function Login() {
    return (
        <>
        <div className='bg-gradient-to-b w-full from-white to-purple-100'>
        <nav className='flex items-center justify-between'> <img src={Lires} alt="" /></nav>
        <main className='flex flex-col items-center justify-center h-screen relative overflow-hidden w-full -mt-20'>
            <div className='flex flex-col gap-4 p-8 rounded-3xl bg-white z-10'>
            <form className='flex flex-col gap-4 p-8 rounded-3xl'>
                <input type="email" placeholder='Email' className='p-2 rounded-md' />
                <input type="password" placeholder='Password' className='p-2 rounded-md' />
                <button type='submit' className='p-2 rounded-md bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] text-white'>Login</button>
                <p className='text-center text-sm text-[#7B68EE]'>Esqueceu sua senha? <a href="/RecuperarSenha">Recuperar</a></p>
                <div className='flex flex-row gap-4 items-center justify-center'>
                <span className='text-center text-sm text-[#7B68EE]'>ou</span>
                </div>
                <div className='flex flex-row gap-4 items-center justify-center'>
                    <button type='submit' className='text-[#7B68EE] p-2 rounded-md bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] text-white'>Google</button>
                    <button type='submit' className='text-[#7B68EE] p-2 rounded-md bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] text-white'>Facebook</button>
                </div>
                <p className='text-center text-sm text-[#7B68EE]'>Não tem uma conta? <a href="/Cadastro">Cadastre-se</a></p>
            </form>
            </div>
            
            {/* Onda rosa animada */}
            <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
                <svg 
                    className="absolute bottom-0 left-0 w-full h-full animate-wave"
                    viewBox="0 0 1200 800" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M0,800 Q300,600 600,700 T1200,800 L1200,800 L0,800 Z" 
                        fill="#ec4899" 
                        className="animate-wave-path"
                    />
                    <path 
                        d="M0,800 Q300,650 600,750 T1200,800 L1200,800 L0,800 Z" 
                        fill="#f472b6" 
                        className="animate-wave-path-delayed"
                    />
                    <path 
                        d="M0,800 Q300,700 600,800 T1200,800 L1200,800 L0,800 Z" 
                        fill="#f9a8d4" 
                        className="animate-wave-path-slow"
                    />
                </svg>
            </div>
        </main>
        
        <style jsx>{`
            @keyframes wave {
                0% {
                    transform: translateX(0) translateY(0);
                }
                25% {
                    transform: translateX(-5px) translateY(-10px);
                }
                50% {
                    transform: translateX(0) translateY(-15px);
                }
                75% {
                    transform: translateX(5px) translateY(-10px);
                }
                100% {
                    transform: translateX(0) translateY(0);
                }
            }
            
            @keyframes wavePath {
                0% {
                    d: path("M0,800 Q300,600 600,700 T1200,800 L1200,800 L0,800 Z");
                }
                50% {
                    d: path("M0,800 Q300,500 600,600 T1200,700 L1200,800 L0,800 Z");
                }
                100% {
                    d: path("M0,800 Q300,600 600,700 T1200,800 L1200,800 L0,800 Z");
                }
            }
            
            .animate-wave {
                animation: wave 6s ease-in-out infinite;
            }
            
            .animate-wave-path {
                animation: wavePath 8s ease-in-out infinite;
            }
            
            .animate-wave-path-delayed {
                animation: wavePath 8s ease-in-out infinite 1s;
            }
            
            .animate-wave-path-slow {
                animation: wavePath 10s ease-in-out infinite 2s;
            }
        `}</style>
        </div>
        </>
    );
}
