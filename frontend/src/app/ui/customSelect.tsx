import Select from 'react-select';

export default function CustomSelect(props: any) {
  return (
    <div className="">
        <Select isDisabled={props.isDisabled || false} id={props.id} options={props.options} className="capitalize" 
            styles={{control: (baseStyles) => ({
            ...baseStyles, 
            height: '3rem', 
            borderRadius: 'var(--rounded-btn, 0.5rem)', 
            cursor: 'pointer', 
            borderColor: 'hsl(var(--bc) / 0.2)', 
            ":hover": {
                ...baseStyles[':hover'], 
                borderColor: 'hsl(var(--bc) / 0.2)'}, 
            ":focus-within": {
                ...baseStyles[':focus-within'],  
                boxShadow: 'none',
            },
            })}}
            defaultValue={props.defaultValue}
            onChange={(e)=> props.onChange(props.id, e.value)}
        />
    </div>
  )
}