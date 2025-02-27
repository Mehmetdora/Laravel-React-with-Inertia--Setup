import { useState } from "react";

export default function Home(props) {
    const [num, setNum] = useState(props.num);

    function print(num) {
        console.log(num);
    }

    return (
        <div>
            <h1>{props.data.deneme}</h1>

            {/* DÜZELTİLDİ: Fonksiyonu çağırırken parametre gönderildi */}
            <button onClick={() => print(num)}>Yazdır</button>

            <h1>React Çalışıyor</h1>
        </div>
    );
}
