'use server';

import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {

  const data = Object.fromEntries(formData);

  console.log("CREDENCIALES RECIBIDAS:", data);

  try {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    //  IMPORTANTE:
    // Si no hay error → login correcto → devolvemos "Success"
    return 'Success';

  } catch (error: any) {

    // Error cuando las credenciales son incorrectas
    if (error?.type === 'CredentialsSignin') {
      return 'CredentialsSignin';
    }

    console.error(error);
    return 'UnknownError';
  }
}

export const login = async(email: string, password: string)=>{

  try{

    await signIn('credentials',{email,password})
    return {ok:true}

  }catch(error){

    console.log(error);
    return{
      ok:false,
      message: 'No se pudo iniciar Sesion'
    }

  }

}
