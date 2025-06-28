import React from 'react'

function QuestionLIstCOntainer({questionsList}) {
  return (
    <div>
        <h2 className='font-bold text-lg'> Generated Interview Questions:</h2>
        <div className='p-5 border border-gray-300 rounded-xl bg-white'>
          {questionsList.map((item, index) => (
            <div key={index} className='p-3 border border-gray-200 rounded-xl mb-3' >
              <h2 className='font-medium'>{item.question}</h2>
              <h2 className='font-sm text-primary'>Type: {item.type}</h2>
            </div>
          ))}
        </div>
    </div>
  )
}

export default QuestionLIstCOntainer