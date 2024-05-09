/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState, useEffect } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

import { SaveSelectedCityToLocalStorage, GetSelectedCityFromLocalStorage } from '../data/caching/LocalStorage.js';

const people = [
  { id: 1, name: 'Prague' },
  { id: 2, name: 'Berlin' },
  { id: 3, name: 'Paris' },
  { id: 4, name: 'London' },
  { id: 5, name: 'New York' },
  { id: 6, name: 'Los Angeles' },
  { id: 7, name: 'Tokyo' },
  { id: 8, name: 'Sydney' },
  { id: 9, name: 'Cape Town' },
  { id: 10, name: 'Rio de Janeiro' },
  { id: 11, name: 'Buenos Aires' },
  { id: 12, name: 'Lima' },
  { id: 13, name: 'Mexico City' },
  { id: 14, name: 'Toronto' },
  { id: 15, name: 'Vancouver' },
  { id: 16, name: 'Anchorage' },
  { id: 17, name: 'Reykjavik' },
  { id: 18, name: 'Dublin' },
  { id: 19, name: 'Oslo' },
  { id: 20, name: 'Helsinki' },
  { id: 21, name: 'Stockholm' },
  { id: 22, name: 'Copenhagen' },
  { id: 23, name: 'Amsterdam' },
  { id: 24, name: 'Brussels' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  useEffect(() => {
    if (selectedPerson) {
      SaveSelectedCityToLocalStorage(selectedPerson.name);
    }
  }, [selectedPerson]);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Label className="block text-sm font-medium text-primary">Pick City:</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person?.name}
          placeholder={selectedPerson ? selectedPerson.name : 'Select a city'}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
