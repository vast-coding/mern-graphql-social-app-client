export const FormErrors = ({ errors }) => {
  const isErrors = Object.keys(errors).length > 0

  return (
    <>
      {isErrors && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
