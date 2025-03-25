import React, { useEffect } from 'react';
import { animate, scroll } from '@motionone/dom';

const Page8 = () => {
    useEffect(() => {
        const items = document.querySelectorAll(".img-container");

        // Animate gallery horizontally during vertical scroll
        scroll(
            animate(".img-group", {
                transform: ["none", `translateX(-${items.length - 1}00vw)`],
            }),
            { target: document.querySelector(".img-group-container") }
        );

        // Progress bar representing gallery scroll
        const progressBar = document.querySelector(".progress");
        if (progressBar) {
            scroll(animate(".progress", { scaleX: [0, 1] }), {
                target: document.querySelector(".img-group-container"),
                onComplete: () => {
                    progressBar.remove();
                }
            });
        }
    }, []);

    return (
        <>
            <article id="gallery" className="w-[100vw] bg-cyan-50">
            <header className="h-[200px] flex justify-center items-center ">
                    <h2 className="text-[56px] font-semibold tracking-[3px] leading-[1.1] text-center m-0 font-[anzo2]">One product, <span className='text-gray-600 font-mono'>endless</span> business <br/> possibilities</h2>
                </header>
                <p className='text-2xl ml-[420px] mt-6'>Cutting-edge AI revolutionizes the process of enhancing visuals,<br/> 
                <span className='ml-[20px]'>making it more efficient than ever before. Create professional</span> <br/>
                <span className='ml-[35px]'>content of the highest caliber for you every business need.</span></p>

                <section className="img-group-container h-[500vh] relative">
                    <div className="sticky top-0 overflow-hidden h-[100vh]">
                        <ul className="img-group flex">
                            <li className="img-container flex w-[100vw] h-[100vh] flex-none items-center justify-center flex-col object-cover">
                                <img src="https://plus.unsplash.com/premium_photo-1683977922495-3ab3ce7ba4e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29jaWFsJTIwcGxhdGZvcm18ZW58MHx8MHx8fDA%3D" alt="#001" 
                                className="w-[800px] h-[500px] object-cover object-center border-spacing-8 border-8 border-solid border-gray-800 rounded-3xl" />
                                <h3 className="mt-8 text-[50px] font-[anzo] tracking-[2px] leading-[1.7] relative bottom-[30px] inline-block">Social platform</h3>
                            </li>

                            <li className="img-container flex w-[100vw] h-[100vh] flex-none items-center justify-center flex-col object-cover">
                                <img src="https://images.unsplash.com/photo-1682687220591-cfd91ab5c1b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEhlcml0YWdlfGVufDB8fDB8fHww" alt="#002"
                                 className="w-[800px] h-[500px] object-cover object-center border-spacing-8 border-8 border-solid border-gray-800 rounded-3xl" />
                                <h3 className="mt-8 text-[50px] font-[anzo] tracking-[2px] leading-[1.7] relative bottom-[30px] inline-block">Heritage</h3>
                            </li>

                            <li className="img-container flex w-[100vw] h-[100vh] flex-none items-center justify-center flex-col object-cover">
                                <img src="https://images.unsplash.com/photo-1580933031135-74149c053f51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFByaW50aW5nJTIwc2VydmljZXMlMjAzZHxlbnwwfHwwfHx8MA%3D%3D" alt="#003" 
                                className="w-[800px] h-[500px] object-cover object-center border-spacing-8 border-8 border-solid border-gray-800 rounded-3xl" />
                                <h3 className="mt-8 text-[50px] font-[anzo] tracking-[2px] leading-[1.7] relative bottom-[30px] inline-block">Printing services</h3>
                            </li>

                            <li className="img-container flex w-[100vw] h-[100vh] flex-none items-center justify-center flex-col object-cover">
                                <img src="https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RSUyMGNvbW1lcmNlfGVufDB8fDB8fHww" alt="#004" 
                                className="w-[800px] h-[500px] object-cover object-center border-spacing-8 border-8 border-solid border-gray-800 rounded-3xl" />
                                <h3 className="mt-8 text-[50px] font-[anzo] tracking-[2px] leading-[1.7] relative bottom-[30px] inline-block">E-commerce</h3>
                            </li>

                            <li className="img-container flex w-[100vw] h-[100vh] flex-none items-center justify-center flex-col object-cover">
                                <img src="https://images.unsplash.com/photo-1535954741680-a2e24eb05418?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWFnYXppbmVzfGVufDB8fDB8fHww" alt="#005" 
                                className="w-[800px] h-[500px] object-cover object-center border-spacing-8 border-8 border-solid border-gray-800 rounded-3xl" />
                                <h3 className="mt-8 text-[50px] font-[anzo] tracking-[2px] leading-[1.7] relative bottom-[30px] inline-block">Magazines</h3>
                            </li>
                        </ul>
                    </div>
                </section>
                <footer className="h-[100px] flex justify-center items-center">
                    <p>
                        Generated by
                        <a target="_blank" rel="noopener noreferrer" href="./user-login" className="text-blue-500 ml-1 ">
                          Suyog & sahil
                        </a>
                    </p>
                </footer>
            </article>
            <div className="progress absolute left-0 right-0 h-[5px] bg-gray-500 bottom-[50px] transform scale-x-0 "> </div>
        </>
    );
};

export default Page8;