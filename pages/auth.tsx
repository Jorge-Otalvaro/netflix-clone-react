import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
 
const Auth = () => {
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === "login" ? "register" : "login"));
    }, []);

    const handleLogin = useCallback(async () => {
        try
          {
            await signIn("credentials", {                 
                email,
                password,
                callbackUrl: "/profiles",        
            });                 
          }
          catch (error) {
             console.log(error);
          }
     }, [email, password, router]);

    const handleSubmit = useCallback(async () => {
        try {
            const res = await axios.post("/api/register", {
                name,
                email,
                password,
            });

            if (res.status === 200) {
                handleLogin();
            }            
        } catch (error) {
            console.log(error);
        }
    }, [
        name,
        email,
        password, 
        handleLogin
    ]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />                   
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">

                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Inicia sesión" : "Registro"}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                            <Input
                                id="username"
                                label="Usuario"
                                type="text"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                            />
                            )}

                            <Input
                                id="email"
                                label="Correo electrónico"
                                type="email"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />

                            <Input
                                id="password"
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                            />
                        </div>

                        <button onClick={variant === "login" ? handleLogin : handleSubmit } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === "login" ? "Iniciar sesión" : "Registrarse"}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div 
                                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                                className="
                                    w-10 
                                    h-10 
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                            >
                                <FcGoogle className="text-2xl" size={30} />
                            </div>

                            <div 
                                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                                className="
                                    w-10 
                                    h-10 
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                            >
                                <FaGithub className="text-2xl" size={30} />
                            </div>
                        </div>
                        
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === "login" ? "Crear nueva cuenta" : "Inicia sesión"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>            
        </div>
    );
};

export default Auth;