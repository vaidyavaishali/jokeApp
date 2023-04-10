import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [joke, setJoke] = useState("")
  const [bookmark, setBookmark] = useState([])
  const AddJoke = () => {
    axios.get("https://official-joke-api.appspot.com/jokes/random").then((res) => {
      setJoke(res.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    const book = JSON.parse(localStorage.getItem('bookmark'))
    if (book) {
      setBookmark(book)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmark))
  }, [bookmark])

  function AddBookmark(joke) {
    if (bookmark[bookmark.length - 1] !== joke) {
      setBookmark([...bookmark, joke])

    } else {
      toast("Already marked")
    }

  }

  function RemoveBookmark(index) {
    let remBook = bookmark.filter((bookmark, i) => i !== index)
    setBookmark(remBook)
    toast("Removed joke from bookmark")
  }

  console.log(bookmark, "book")

  console.log(joke)
  return (
    <div className='main-container'>
      <header>

        <h2>Joke Application</h2>
        <button onClick={AddJoke} id="add-joke">New Joke</button>
        <button onClick={() => { AddBookmark(joke) }} id="add-book">Add Bookmark</button>
        <ToastContainer id="toast"/>

      </header>
      <div id='inner-container'>
        <div id='bookmark'>
          {bookmark.map((book, i) => {
            return (
              <div key={i}>
                <p>{book.setup} {book.punchline}</p>
                <button onClick={() => { RemoveBookmark(i) }} id="rem-book">Remove Bookmark</button>
              </div>
            )
          })}
        </div>
        <div id='joke-container' >
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>

        </div>
      </div >
      <footer>
        <p>Author: Vaishali Vaidya</p> 
        <p style={{ marginTop:"-23px"}}>
        <a href='https://github.com/vaidyavaishali/jokeApp' target='_blank'>
            view Source code
        </a>
        </p>
       
      </footer>
    </div >

  )

}

export default App;
