import React, {useEffect, useState} from 'react'
import { ScrollView, Button, Text } from 'react-native'
import NotificacionesList from 'components/NotificacionesList'
import { useAuth }from 'hooks/useAuth'
import getNotificaciones from 'services/getNotificaciones'

export default function Notificaciones({navigation}){
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)
    const [notificaciones, setNotificaciones] = useState([])
    const {userToken} = useAuth()
    const scrollRef = React.useRef(null);

    useEffect(()=>{
        obtenerNotificaciones(page)
    }, [page])

    const obtenerNotificaciones = (page) => {
        getNotificaciones({page, accessToken: userToken })
        .then((page) => {
            setNotificaciones(page.results)
            setPrevious(page.previous)
            setNext(page.next)
        })
    }

    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
 }
    const paginaSiguiente = () => {
        getNotificaciones({page: page +1, accessToken: userToken})
        setPage(page + 1)
        onPressTouch()
    }

    const paginaAnterior = () => {
        getNotificaciones({page: page-1, accessToken: userToken})
        setPage(page - 1)
        onPressTouch()
    }

    return(
        <ScrollView ref={scrollRef}>
            <NotificacionesList notificaciones={notificaciones}/>
            {console.log(notificaciones)}
            { next!=null && 
                <Button title="Siguiente" onPress={()=>{paginaSiguiente()}}/>
            }
            { previous!=null && 
                <Button title="Atras" onPress={()=>paginaAnterior()}/> 
            }
        </ScrollView>
    )
}