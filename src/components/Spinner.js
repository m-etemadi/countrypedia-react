import icons from '../img/icons.svg';

function Spinner() {
  return (
    <div className="loader">
      <svg>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  );
}

export default Spinner;
