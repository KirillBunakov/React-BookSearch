import React, {useState} from 'react'
import {Card, CardTitle, CardImg, CardBody, Button, Modal} from 'reactstrap'

const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink,
  categories
  

}) => {
  // states
  const [modal,setModal] = useState(false)
  const toggle = () => setModal(!modal)
// Шаблон карт книг
  return <Card style={{width:'233px'}} className='m-auto'>
    <CardImg top style={{width:'100%', height:'233px'}} src={thumbnail} alt={title}/>
    <CardBody>
      <CardTitle className='card-title'>{ title}</CardTitle>
      <CardTitle className='card-title'>{ categories}</CardTitle>
      <CardTitle className='card-title'>{ authors}</CardTitle>
      <Button onClick={toggle}>More info</Button>
    </CardBody>
    <Modal isOpen={modal} toggle={toggle}>
      <div className="modal-header d-flex justify-content-center">
        <h5 className='modal-title-center' id='exampleModalLabel'>{ title}</h5>
        <button aria-label='Close' className='close' type='button' onClick={toggle}>
          <span aria-hidden={true}>X</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="d-flex justify-content-between ml-3">
          <img src={thumbnail} alt={title} style={{ height:'233px'}}/>
          <div>
            <p>Page Count : { pageCount}</p>
            <p>Language : { language}</p>
            <p>Authors : { authors}</p>
            <p>Subject : { categories}</p>
            <p>Publisher : { publisher}</p>
          </div>
        </div>
        <div className='mt-3'>{ description}</div>
      </div>
      <div className="modal-footer">
        <div className="left-slide">
          <a href={ previewLink} 
          className='btn-link' 
          color='default' 
          type=';button' 
          target='blank' 
          rel='nonpener noreferre'>Preview Link</a>
        </div>
        <div className="divider">        
        <div className="left-slide">
          <a href={ infoLink} 
          className='btn-link' 
          color='default' 
          type=';button' 
          target='blank' 
          rel='nonpener noreferre'>Info Link</a>
        </div>
        </div>
      </div>
    </Modal>
  </Card>
}

export default BookCard