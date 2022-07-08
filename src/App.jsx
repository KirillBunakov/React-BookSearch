import React, {useState} from 'react'
import './App.css';
import { InputGroup,Input, Button, FormGroup, Label, Spinner} from 'reactstrap'
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import BookCard from './BookCard.jsx'
function App() {
// States
  const [maxResults] = useState(40);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState(0);
  const categoriesList = ['All', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry'];
  const [sorting, setSorting] = useState(0);
  const sortList = ['relevance','newest']

  // Handle Search
  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error('max results must be between 1 and 40');
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${categoriesList[category]}&orderBy=${sortList[sorting]}&maxResults=${maxResults}`
        )
        .then(res => {
          if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `max reults must be between 1 and ${res.data.totalItems}`
            );
          } else {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
              setLoading(false);
            }
          }
        })
        .catch(err => {
          setLoading(true);
          console.log(err.response);
        })
    }
  };

// Вывод массива categoriesList
  const optionsList = categoriesList.map((text, index) => {
     return <option key={index} value={index}>{text}</option>;
  });

// Вывод массива sortList
  const optionsSort = sortList.map((text, index) => {
    return <option key={index} value={index}>{text}</option>;
 });

// Поиск по кнопке enter
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
 
// loadmore
  const loadMore = {
  }

  // Шаблон элементов
  const mainHeader = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        <div className='filter'></div>
        <h1
          className='display-2 text-center text-white mb-3'
          style={{ zIndex: 2 }}
        >Google Books</h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Book Search'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
              <Button color='secondary' onClick={handleSubmit} >
                <i className='fas fa-search'></i>
              </Button>
          </InputGroup>
          <div className='d-flex text-white justify-content-center'>
            {/* <FormGroup >
              <Label for='maxResults'>Max Results</Label>
              <Input
                type='number'
                id='maxResults'
                placeholder='Max Results'
                value={maxResults}
                onChange={e => setMaxResults(e.target.value)}
              />
            </FormGroup> */}
            {/* <FormGroup className='ml-5'>
              <Label for='startIndex'>Start Index</Label>
              <Input
                type='number'
                id='startIndex'
                placeholder='Start Index'
                value={startIndex}
                onChange={e => setStartIndex(e.target.value)}
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="Categories">Categories</Label>
              <select className='ml-1' value={category} onChange={(event) => setCategory(event.target.value)}>{optionsList}</select>
            </FormGroup>
            <FormGroup className='ml-5'>
            <Label for="Sorting by">Sorting by</Label>              
            <select className='ml-1' value={sorting} onChange={(event) => setSorting(event.target.value)}>{optionsSort}</select>
            </FormGroup>
          </div>
          <div className='text-center text-white mb-3'><p>Book's count:{cards.length}</p></div>
        </div>
      </div>
    );
  };

// Вывод шаблона карт книг
  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className='col-lg-4 mb-3' key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
              categories={item.volumeInfo.categories}
            />
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    }
  };

// вывод элементов
  return (
    <div className='w-100 h-100'>
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}



export default App;