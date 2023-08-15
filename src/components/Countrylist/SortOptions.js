const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'Y',
  'Z',
];

function SortOptions() {
  return (
    <>
      {alphabet.map(alphabet => (
        <option value={alphabet} key={alphabet}>
          {alphabet}
        </option>
      ))}
    </>
  );
}

export default SortOptions;
