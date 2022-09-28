import { describe, expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test-utils';

import AgeChecker, {convertDate, calcDaysOld} from './AgeChecker'

describe('Age Checker', () => {
    describe('Rendering and user interaction', () => {

        beforeEach(() => {
            render(<AgeChecker />)
        })
        it('Displays a date of birth input field', () => {
            const dobInpt = screen.getByRole('textbox', {
                name: 'Date of birth:'
            })
    
            expect(dobInpt).toBeVisible()
        })
    
        it('Displays a submit button', () => {
            const submitBtn = screen.getByRole('button', {
                name: /submit/i
            })
            expect(submitBtn).toBeVisible()
        })
    
        it('Displays users age in days when form is submitted', async () => {    
            const dobInpt = screen.getByRole('textbox', {
                name: 'Date of birth:'
            })
            const submitBtn = screen.getByRole('button', {
                name: /submit/i
            })
            await userEvent.type(dobInpt, '29/08/1990')
            await userEvent.click(submitBtn)
            const daysOldTxt = await screen.findByText(/^(you are) [0-9]+ (days old)$/i) // use a regex to match the string

            expect(daysOldTxt).toBeVisible()
        })

        it('Displays an error if invalid date is submitted', async() => {
            const dobInpt = screen.getByRole('textbox', {
                name: 'Date of birth:'
            })
            const submitBtn = screen.getByRole('button', {
                name: /submit/i
            })
            await userEvent.type(dobInpt, 'invalid')
            await userEvent.click(submitBtn)

            const errorTxt = await screen.findByText('Error: Invalid date - date should be in DD/MM/YYYY format')
            expect(errorTxt).toBeVisible()
        })

        it('Displays an error if empty date is submitted', async() => {
            const submitBtn = screen.getByRole('button', {
                name: /submit/i
            })
            await userEvent.click(submitBtn)
            const errorTxt = await screen.findByText('Error: Please enter your date of birth')
            expect(errorTxt).toBeVisible()
        })

        it('Displays an error if date is in the future', async() => {
            const dobInpt = screen.getByRole('textbox', {
                name: 'Date of birth:'
            })
            const submitBtn = screen.getByRole('button', {
                name: /submit/i
            })
            await userEvent.type(dobInpt, '01/01/3022')
            await userEvent.click(submitBtn)

            const errorTxt = await screen.findByText('Error: Date cannot be in the future')
            expect(errorTxt).toBeVisible()
        })
    })
  

    describe('Date logic', () => {
         it('Should return date in DD/MM/YYYY format when date in YYYY-MM-DD format is passed in', () => {
            const convertedDate = convertDate('29/08/1990')
            expect(convertedDate).toBe('1990-08-29')
        })

        it('Should return correct number of days between a given date and today', () => {
            vi.useFakeTimers() // use mocked time
            vi.setSystemTime(new Date(2022, 8, 25)) // september is the 8th month as month index starts at 0
            const daysOld = calcDaysOld('1990-08-29')
            expect(daysOld).toBe(11715)
            vi.useRealTimers() // restore date
        })
    })
})

