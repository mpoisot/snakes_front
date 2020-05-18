import React, { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"

const fileUploadUrl = process.env.BACKEND_URL + "/upload"
const urlUploadUrl = process.env.BACKEND_URL + "/classify-url"

export default function Uploader() {
  const [file, setFile] = useState()
  const [progress, setProgress] = useState(-1)
  const [error, setError] = useState(undefined)
  const [results, setResults] = useState(undefined)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResults(undefined)
    setError(undefined)

    if (!e.target.files) return

    let file = e.target.files[0]
    setFile(file)
  }

  const handleUrlAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log(value)

    if (value == "") return

    uploadUrl(value)
  }

  const uploadUrl = (urlStr) => {
    setResults(undefined)
    setError(undefined)

    let data = {
      url: urlStr,
    }

    let config: AxiosRequestConfig = {
      onUploadProgress: (p: any) => {
        setProgress(Math.round((p.loaded * 100) / p.total))
      },
    }

    axios.post(urlUploadUrl, data, config).then(
      (res) => {
        console.log(res.data)
        setResults(res.data)
        setError(undefined)
        setProgress(-1)
      },
      (err) => {
        console.error(err)
        setError(err)
        setProgress(-1)
      }
    )
  }

  const uploadFile = () => {
    setError(undefined)
    setProgress(0)

    let data = new FormData()
    data.append("file", file)

    let config: AxiosRequestConfig = {
      onUploadProgress: (p: any) => {
        setProgress(Math.round((p.loaded * 100) / p.total))
      },
    }

    axios.post(fileUploadUrl, data, config).then(
      (res) => {
        console.log(res.data)
        setResults(res.data)
        setError(undefined)
        setProgress(-1)
      },
      (err) => {
        console.error(err)
        setError(err)
        setProgress(-1)
      }
    )
  }

  return (
    <>
      <div>
        <label>
          Upload a snake photo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {file && <button onClick={uploadFile}>Upload</button>}
        {/* { progress > -1 && <Progress percentage={this.state.progress} />} }  */}
      </div>
      <div>
        Or paste an image URL
        <input type="url" name="url" onChange={handleUrlAdded} />
      </div>

      {error && <div>Something went wrong!</div>}
      {results && <Results results={results} />}

      <div>
        {file && (
          <img style={{ height: "60vh" }} src={URL.createObjectURL(file)} />
        )}
      </div>
    </>
  )
}

const Results = ({ results }) => {
  return (
    <div>
      <h2>Prediction</h2>
      <ul>
        {results.predictions.map((result) => {
          const name = result[0]
          const probability = Number.parseFloat(result[1])
          const nicePercent = round_to_precision(probability, 0.01) * 100

          return (
            <li key={name}>
              {name}: {nicePercent}%
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function round_to_precision(x, precision) {
  var y = +x + (precision === undefined ? 0.5 : precision / 2)
  return y - (y % (precision === undefined ? 1 : +precision))
}
