import AccordionList from './AccordionList'

const fetchSteps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`)
    const data = await res.json()
    return data.steps
}

const Steps = async () => {
    const data = await fetchSteps()
  return (
        <AccordionList steps={data} />
  )
}

export default Steps
