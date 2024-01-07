interface Props{
    searchParams:any
}

// 에러가 발생하는 페이지지만 구동엔 문제가 없음...
export default function Input(props:Props){
    console.log(props.searchParams);
    return(
        <section>
            InputPage
            <br/>
            <label>
                Text
                <input type="text" name="text"/>
            </label>
            <br/>
            <label>
                Select
                <select name="select" multiple={true}>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                </select>
            </label>
            <br/>
            <label>
                <input type="checkbox" name="checkbox" value={"check1"}></input>
                checkbox
            </label>
            <br/>
            <label>
                Color
                <input type="color" name="color"/>
            </label>
            <br/>
            <span>Radio</span>
            <input type="radio" name="radio" value={"1"}></input>
            <input type="radio" name="radio" value={"2"}></input>
            <input type="radio" name="radio" value={"3"}></input>
            <input type="radio" name="radio" value={"4"}></input>
            <br/>
            <label>
                Date
                <input type="date" name="date"/>
            </label>
            <br/>
            <label>
                Month
                <input type="month" name="month"/>
            </label>
            <br/>
            <input type="submit" value="submit"/>
            <br/><br/><br/>
            <article>
                {JSON.stringify(props.searchParams)}
            </article>
        </section>
    );
}