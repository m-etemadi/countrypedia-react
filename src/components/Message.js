import icons from '../img/icons.svg';

function Message({ message }) {
  return (
    <div className="message">
      <div>
        <svg>
          <use href={`${icons}#icon-smile`}></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Message;
