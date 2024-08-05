export default function Logo() {
  return (
    <div className={"flex flex-row items-center text-primary"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle inline"
      >
        <g transform="translate(24, 0) scale(-1, 1)">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
        </g>
      </svg>
      <span className={"text-3xl text-gray-600 font-bold"}>uiz app</span>
    </div>
  );
}
