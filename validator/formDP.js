

export default function validar(aValidar, input, setInput){
    var errores = 0
    if(aValidar == 'nombre'){
        if(input.length == 0){ 
            setInput("El nombre no puede ser vacio") 
            errores++
        }
        else if(input.length < 3 || input.length > 30) {
            setInput("El nombre debe contener entre 3 y 30 caracteres")
            errores++
        }
    }
    else if(aValidar == 'apellido'){
        if(input.length == 0){ 
            setInput("El apellido no puede ser vacio") 
            errores++
        }
        else if(input.length < 3 || input.length > 30) {
            setInput("El apellido debe contener entre 3 y 30 caracteres")
            errores++
        }
    }
    else if(aValidar == 'genero'){
        if(input == ""){ 
            setInput("Tienes que seleccionar un género") 
            errores++
        }
    }
    else if(aValidar == 'dni'){
        if(input.length == 0){ 
            setInput("El DNI no puede ser vacio") 
            errores++
        }
        else if(input.length < 6 || input.length > 8) {
            setInput("El DNI debe contener entre 6 y 8 caracteres")
            errores++
        }
    }
    else if(aValidar == 'bod'){
        if(input.length == 0){ 
            setInput("La fecha de nacimiento no puede ser vacia") 
            errores++
        }
        else if(input.length < 10) {
            setInput("Fecha de nacimiento inválida (ejemplo: 12/10/1978)")
            errores++
        }
    }

    if(errores == 0){
        setInput("")
        return true
    }
    return errores>0
}

