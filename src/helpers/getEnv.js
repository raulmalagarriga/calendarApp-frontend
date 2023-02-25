
// Con javascript podemos acceder a las variables de entorno con esta funcion
const getEnv = () => {

    import.meta.env;
    return{
        // Si el build da error usa la siguiente linea: (hay que quitar "import.meta.env" )
        // VITE_API_URL: import.meta.env.VITE_API_URL
        ...import.meta.env
    }
}

export default getEnv;

