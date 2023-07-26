import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Cotizacion = ({resultado}) => {
  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = resultado

  // El return es de la funcion, por lo que si es null ya no retornara mas nada
  if(Object.keys(resultado).length === 0) return null // cuando es una linea no son necesarias las llaves

  return (
    <View style={styles.resultado}>
        <Text style={[styles.texto, styles.precio]}>
            <Text style={styles.span}>{PRICE}</Text>
        </Text>
        <Text style={styles.texto}>Highest price of the day: {' '}
            <Text style={styles.span}>{HIGHDAY}</Text>
        </Text>
        <Text style={styles.texto}>Lowest price of the day: {' '}
            <Text style={styles.span}>{LOWDAY}</Text>
        </Text>
        <Text style={styles.texto}>Variation last 24 hours: {' '}
            <Text style={styles.span}>{CHANGEPCT24HOUR}%</Text>
        </Text>
        <Text style={styles.texto}>Last update: {' '}
            <Text style={styles.span}>{LASTUPDATE}</Text>
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5e49e2',
    padding: 20,
  },
  texto: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {
    fontSize: 30,
  },
  span: {
    fontFamily: 'Lato-Black',
    fontWeight: 'bold',
  },
})

export default Cotizacion