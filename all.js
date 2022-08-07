const { useState } = React;
const root = ReactDOM.createRoot(document.getElementById("root"));


function App() {

  // 設定預設幣種
  const [currency, setCurrency] = useState([
    {
      name: "JPY",
      rate: 4.44
    },
    {
      name: "USD",
      rate: 0.033
    },
    {
      name: "AUD",
      rate: 0.04
    },
  ]);

  {/*幣種名稱*/ }
  const [newCur, setNewCur] = useState('');
  const [currencyRate, setCurrencyRate] = useState(0)

  const handAddCurrency = () => {
    const newCurrency = {
      name: newCur,
      rate: currencyRate
    }
    setCurrency([...currency, newCurrency])
  }

  // 記錄欲兌換的單筆金額
  const [money, setMoney] = useState("");

  // 記錄錢包的錢
  const [wallet, setWallet] = useState(5000);
  //紀錄
  const [exchangeLog, setExchangeLog] = useState([
    // { TWD: 100, countryCurrency: 44.0, country: 'JSP' }
  ]);
  const exchangeMoney = (TWD, countryCy, country) => {
    console.log('ee', TWD, countryCy, country, 'money:', money)
    setWallet((prev) => prev - TWD)
    setExchangeLog((prev) => {
      return [
        ...prev,
        {
          TWD: TWD,
          countryCurrency: countryCy,
          country: country
        }
      ]
    })

  }


  // 列表元件
  function CurrencyList(props) {
    const { item } = props
    let currentMoney = Math.round(item.rate * money * 100) / 100;
    return (
      <li className="text-xl mb-2 px-6 py-2 border-b border-gray-200 w-full">
        {item.name}（{item.rate}）: {!isNaN(money) ? currentMoney : "input numbers"}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 ml-4 rounded" onClick={() => exchangeMoney(money, currentMoney, item.name)}>Exchange</button>
      </li>
    );
  }

  function ExchangeList(props) {
    // console.log(props)
    const { item } = props
    return (
      <li className="text-xl mb-2 px-6 py-2 border-b border-gray-200 w-full">
        Used {item.TWD} TWD Exchange {item.countryCurrency} {item.country}
      </li>
    );
  }

  return (
    <>
      <div className="bg-rose-100 text-blake text-lg">
        <div className="flex flex-col p-10 mx-auto h-screen justify-center items-cente  bg-white max-w-4xl">
          <h1 className="text-4xl mb-8">匯率兌換</h1>
          <h2 className="text-3xl mb-4">Add New Currency</h2>

          <div className="flex ">
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Currency Name" onChange={(e) => setNewCur(e.target.value)} type="text" />
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mr-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Currency Rate" onChange={(e) => setCurrencyRate(e.target.value)} type="text" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded" onClick={handAddCurrency}>Add currency</button>
          </div>
          <h2 className="text-3xl mb-4">You have {wallet} in wallet</h2>
          <h2 className="text-3xl mb-4">Input Exchange Amount (TWD)</h2>
          <div className="flex">
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg leading-8 mb-4 focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5  mr-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="amount" onChange={(e) => setMoney(e.target.value)} type="text" />
          </div>
          <ul>
            {
              currency.map((item, i) => {
                return <CurrencyList key={i} item={item} />
              })
            }
          </ul>

          <h2 className="text-3xl mb-4 mt-4"> Exchange Log</h2>
          <ul>
            {
              exchangeLog.map((item, i) => {
                return <ExchangeList key={i} item={item} />
              })
            }
          </ul>



          {/* <p>{value}</p> */}
        </div>
      </div>
    </>
  )
}




root.render(<App />);
