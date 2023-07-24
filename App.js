import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'

const App = () => {
  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [consultarAPI, setConsultarAPI] = useState(false)
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        // Consultar API
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const response = await fetch(url)
        const result = await response.json()

        setCargando(true)
        
        setTimeout(() => {
          setResultado(result.DISPLAY[criptomoneda][moneda]) // los corchetes siempre que las propiedades sean dinamicas
          setConsultarAPI(false)
          setCargando(false)
        }, 3000)
      }
    }
    cotizarCriptomoneda()
  }, [consultarAPI])

  const componente = cargando ? <ActivityIndicator size="large" color="5e49e2" /> : <Cotizacion resultado={resultado} />

  return (
    <>
      <ScrollView>
        <Header />

        <Image 
          style={styles.imagen}
          source={ require('./assets/img/cryptomonedas.png') }
        />

        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            setMoneda={setMoneda}
            criptomoneda={criptomoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarAPI={setConsultarAPI}
          />

        </View>

      <View style={styles.contenedor}>
        {componente}
      </View>

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
  contenedor: {
    marginTop: 20,
  },
})

export default App