import { useEffect, useState } from 'react';
import styles from './AgeChecker.module.css';
import moment from 'moment';

export const convertDate = (dateStr) => {
    return moment(dateStr, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export const calcDaysOld = (dateStr) => {
    return moment().diff(dateStr, 'days')
}

const AgeChecker = () => {

    const [dob, setDob] = useState('')
    const [daysOld, setDaysOld] = useState()
    const [error, setError] = useState()

    const handleChange = (event) => {
        setDob(event.target.value)
    }

    const handleSubmit = (event) => {
        setError(false)
        const isValidDate = moment(dob, 'DD/MM/YYYY',true).isValid()
        
        if (isValidDate) {
            const convertedDate = convertDate(dob)
            const daysOld = calcDaysOld(convertedDate)
            daysOld >= 0 ? setDaysOld(daysOld) : setError('Date cannot be in the future')
        } else if (!dob){
            setError('Please enter your date of birth')
        } else {
            setError('Invalid date')
        }
    }
   
    return (
        <>
            <h2>Example 6 - Form input field with validation and mocked date</h2>
            <p>Tests form submission and error handling</p>
            <p>We mock the date using vi.useFakeTimers() and vi.setSystemTime() so that we our tests doesn't fail when the date changes.</p>
            <p>See: AgeChecker.jsx / AgeChecker.spec.jsx</p>
            <div className={styles.ageChecker}>
                <label htmlFor="dob">Date of birth:</label>
                <input type="text" id="dob" name="Dob" onChange={handleChange} value={dob} placeholder="DD/MM/YYYY"/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
                {daysOld && !error && <h4>You are {daysOld} days old</h4>}
                {error && <h4>Error: {error}</h4>}
            </div>
        </>
    )
}

export default AgeChecker