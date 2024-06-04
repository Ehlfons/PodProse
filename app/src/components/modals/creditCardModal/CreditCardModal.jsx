import { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faTimes } from '@fortawesome/free-solid-svg-icons'
import {toast} from "sonner"

import './CreditCardModal.css'

const CreditCardModal = ({show, setShow}) => {

  const [creditCard, setCreditCard] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  })

  const handleValidation = () => {
    let isValid = true

    if (creditCard.name.length < 8) {
      toast.error("El nombre debe tener al menos 8 caracteres")
      isValid = false
    }

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(creditCard.cardNumber)) {
      toast.error("El número de tarjeta debe ser en formato '1234 1234 1234 1234'")
      isValid = false
    }

    if (!/^\d{2}\/\d{2}$/.test(creditCard.expirationDate)) {
      toast.error("La fecha de expiración debe ser en formato 'MM/YY'")
      isValid = false
    }

    if (!/^\d{3}$/.test(creditCard.cvv)) {
      toast.error("CVV debe ser un número de 3 dígitos")
      isValid = false
    }

    return isValid
  }

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    let formattedValue = value
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    }

    setCreditCard({
      ...creditCard,
      [name]: formattedValue
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (handleValidation()) {
      toast.success("Compra realizada con éxito.")
      setCreditCard({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
      })
      setShow(false)
    }      
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <Fragment>
      {show && (
        <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="modal">
            <div className="modal-header">
              <h1><FontAwesomeIcon icon={faCreditCard} /> Tarjeta de crédito</h1>
              <span className="cerrar-modal" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input 
                  type='text' 
                  name='name' 
                  placeholder='Nombre completo' 
                  value={creditCard.name} 
                  onChange={handleChange} 
                />
                <input 
                  type='text' 
                  name='cardNumber' 
                  placeholder='1234 1234 1234 1234' 
                  value={creditCard.cardNumber} 
                  onChange={handleChange} 
                />
                <input 
                  type='text' 
                  name='expirationDate' 
                  placeholder='01/30' 
                  value={creditCard.expirationDate} 
                  onChange={handleChange} 
                />
                <input 
                  type='text' 
                  name='cvv' 
                  placeholder='123' 
                  value={creditCard.cvv} 
                  onChange={handleChange} 
                />
                <button type="submit">Comprar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default CreditCardModal