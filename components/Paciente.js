import React from 'react'
import {Card, CardItem, Text, Body} from 'native-base';

export default function Paciente({paciente}){
    return(
        <Card>
            <CardItem>
              <Body>
                <Text>
                  {paciente.user.first_name + " "+ paciente.user.last_name +", " + paciente.user.dni}
                </Text>
              </Body>
            </CardItem>

         </Card>
    )
}