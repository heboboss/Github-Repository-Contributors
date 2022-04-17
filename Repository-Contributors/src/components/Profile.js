import DisplayTable from "./DisplayTable";

const { useState } = require("react")

const Profile = () => {
    const [error, setError] = useState("");

    const [data, setData] = useState({});
    const [companyName, setCompanyName] = useState("");
    const [repositoryName, setRepositoryName] = useState("");

    const [contributers, setContributers] = useState([]);

    const onCompanyChangeHandler = e => {
        setCompanyName(e.target.value);
    }

    const onRepositoryChangeHandler = e => {
        setRepositoryName(e.target.value);
    }

    const submitHandler = async e => {
        e.preventDefault();
        if (companyName === '' || repositoryName === '') {
            setError('Both Fields should be filled');
            setData({});
        }
        else {
            setError('');
            const profile = await fetch(`https://api.github.com/repos/${companyName}/${repositoryName}/contributors`);
            const profileJson = await profile.json();

            if (profileJson) {
                setData(profileJson);
                console.log("Data", data)
            }
        }
    }
    return (
        <div style={{ padding: 20 }}>
            <div className="ui search">
                <div className="ui icon input">
                    <i className="search icon"></i>
                    <input
                        className="prompt"
                        placeholder="search company name here ..."
                        type="text"
                        value={companyName}
                        onChange={onCompanyChangeHandler}
                    />
                </div>
                <div className="ui icon input">
                    <i className="search icon"></i>
                    <input
                        className="prompt"
                        placeholder="search repository name here ..."
                        type="text"
                        value={repositoryName}
                        onChange={onRepositoryChangeHandler}
                    />
                </div>
                <button
                    className="ui primary button"
                    type="submit"
                    onClick={submitHandler}>
                    <i className="github icon"></i>
                    Search
                </button>
                <br />
                {error !== '' ? <span>{error}</span> : null}
                {data.length > 0 ? <DisplayTable data={data} contributers={contributers} /> : null}
            </div>
        </div>
    )
}

export default Profile;  