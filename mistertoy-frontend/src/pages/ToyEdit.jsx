import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.local.js";
import { saveToy } from "../store/actions/toy.actions.js";
import { showSuccessMsg } from "../services/event-bus.service.js";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { Button ,TextField} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CheckBox } from "@mui/icons-material";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required please'),
  price: Yup.number().required('Required'),
});

export function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const [isLoading, setIsLoading] = useState(false)
  const labels = toyService.getLabels()

  const isOnline = useOnlineStatus()
  const setHasUnsavedChanges = useConfirmTabClose()

  const navigate = useNavigate()
  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService.getById(toyId)
      .then((toy) => {
        setToy(toy)
      })
      .catch(err => {
        console.log('Had issues in toy edit', err)
        navigate('/toy')
      })
  }
  function resetLabels(ev) {
    ev.preventDefault()
    setToy((prevToy) => ({ ...prevToy, labels: [] }))
  }
  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }
    setToy((prevToy) => ({ ...prevToy, [field]: value }))
    setHasUnsavedChanges(true)
  }
  function handleChangeLabels({ target }) {
    const { name, checked } = target
    if (checked) setToy((prevToy) => ({ ...prevToy, labels: [...toy.labels, name] }))
    else {
      setToy((prevToy) => ({ ...prevToy, labels: toy.labels.filter(label => label !== name) }))
    }
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    setIsLoading(true)
    saveToy(toy)
      .then(
        (savedToy) => {
          setIsLoading(false)
          showSuccessMsg('Toy Saved (id:', savedToy._id, ')')
          navigate('/toy')
        }
      )
  }


  return (
    <section className="toy-edit">
      <h2>{toy._id ? 'Edit' : 'Add'} Toy</h2>
      <Formik
        initialValues={{
          name: '',
          price: 0,
          labels: [],
          inStock: true
        }
        }
        validationSchema={SignupSchema}
        onSubmit={onSaveToy}
      >
        {({ errors, touched, dirty }) => (
          <Form className='formik'
          onSubmit={onSaveToy}
          >
            {/* {console.log(dirty)} */}
            <Field as={CustomInput} value={toy.name || ''} label="name" name="name" onChange={handleChange} />
            {errors.name && touched.name && (
              <div className='errors'>{errors.firstName}</div>
            )}
            <Field as={CustomInput} value={toy.price || 0} label="price" name="price" type='number' onChange={handleChange}/>
            {errors.price && touched.price && (
              <div className='errors'>{errors.price}</div>
            )}
            <label htmlFor="inStock">In Stock</label>
            <Field value={toy.inStock || true} checked={toy.inStock ?? true} onChange={handleChange} type='checkbox' label='In stock' name='inStock'/>
            <fieldset className="label-chooser">
          {labels.map(label =>
            <label key={label} className="tag">
              <input
                onChange={handleChangeLabels}
                name={label}
                checked={toy.labels.includes(label) || false}
                type="checkbox" />
              <span>{label}</span>
            </label>)}
          <Button variant="Clear Labels" onClick={resetLabels}>Clear Labels</Button>
        </fieldset>
        <Link to='/toy'>Cancel</Link>
            <Button loading={isLoading}type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
      <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
    </section>
  )

}
function CustomInput(props) {
    // console.log('props:', props)
    return (
        <TextField
            label={props.label}
            variant="outlined"
            {...props}
        />
    )
}