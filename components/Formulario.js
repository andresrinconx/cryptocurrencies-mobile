import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Picker } from '@react-native-picker/picker'

const Formulario = ({
    moneda, 
    setMoneda, 
    criptomoneda, 
    setCriptomoneda, 
    setConsultarAPI
}) => {
  const [criptomonedas, setCriptomonedas] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    
      try {
        const response = await fetch(url) // almacena el objeto Response con todos los datos
        const result = await response.json() // almacena los datos obtenidos en Response como JSON
        setCriptomonedas(result.Data)
      } catch (error) {
        console.log(error)
      }
    }
    consultarAPI()
  }, [])

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda)
  }

  const obtenerCriptomoneda = (criptomoneda) => {
    setCriptomoneda(criptomoneda)    
  }

  const cotizarPrecio = () => {
    if(moneda.trim() === '' || criptomoneda.trim() === '') {
        mostrarAlerta()
        return
    }    

    // Se pasa la validacion
    setConsultarAPI(true)
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'Ambos campos son obligatorios',
      [
        { text: 'OK' },
      ]
    )    
  }

  return (
    <View>
      <Text style={styles.label}>Currency</Text>
      <Picker 
        style={styles.input}
        onValueChange={ moneda => obtenerMoneda(moneda) }
        selectedValue={moneda} // Al valor que cambia
      >
        <Picker.Item label='- Select -' value="" />
        <Picker.Item label='US Dollar' value="USD" />
        <Picker.Item label='Mexican Peso' value="MXN" />
        <Picker.Item label='Euro' value="EUR" />
        <Picker.Item label='Pound Sterling' value="GBP" />
      </Picker>

      <Text style={styles.label}>Cryptocurrency</Text>
      <Picker 
        style={styles.input}
        onValueChange={ criptomoneda => obtenerCriptomoneda(criptomoneda) }
        selectedValue={criptomoneda}
      >
        <Picker.Item label='- Select -' value="" />
        { criptomonedas.map( cripto => (
            <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
        )) }
      </Picker>

      <Pressable
        style={styles.btnCotizar}
        onPressOut={ () => cotizarPrecio() }
      >
        <Text style={styles.textoCotizar}>Quote</Text>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default Formulario