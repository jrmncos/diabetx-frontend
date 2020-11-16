export default function validar(password, confirmPassword, setErrorPassword){
    var errores = 0
    if(password.length == 0 || confirmPassword == 0){
        errores++
        setErrorPassword("Las contraseñas no pueden ser vacias")
    }
    if(!(password === confirmPassword)){
        errores++
        setErrorPassword("Las contraseñas no coinciden")
    }
  
    
    if(errores == 0){
        setErrorPassword("")
        return true
    }
    else{
        return false
    }
  }