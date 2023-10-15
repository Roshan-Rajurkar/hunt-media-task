import React, { useEffect, useState } from 'react';
import '../App.css'
import axios from 'axios'

const Table = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api');
                const hunts = await response.data;
                setData(hunts)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [data]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [monthYear, setMonthYear] = useState(0);
    const [dateExcludes, setDateExcludes] = useState([]);
    const [days, setDays] = useState(0);
    const [leadCount, setLeadCount] = useState(null);
    const [expectedDRR, setExpectedDRR] = useState(null);


    const calculateDays = () => {
        if (endDate) {
            const date1 = new Date(startDate);
            const date2 = new Date(endDate);

            const timeDifference = date2 - date1;

            const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

            setDays(daysDifference - dateExcludes.length)
        }
    }

    const getMonthYear = () => {
        if (startDate !== "" && endDate !== "") {
            const sm = new Date(startDate).getMonth();
            const em = new Date(endDate).getMonth();
            if (sm === em) {
                setMonthYear(sm + 1);
            } else {
                setMonthYear(new Date(endDate).getFullYear());
            }
        }
    }

    useEffect(() => {
        getMonthYear();
        calculateDays();
    }, [endDate, dateExcludes]);


    const addExcludedDate = (newDate) => {
        if (startDate && endDate)
            setDateExcludes([...dateExcludes, newDate]);
    }

    // handling Save
    const handleSave = async () => {
        if (startDate === "" || endDate === "s" || leadCount === null || expectedDRR === null) {
            alert('some fields are missing ');
            return;
        }

        const hunt = {
            startDate,
            endDate,
            monthYear,
            days,
            leadCount,
            expectedDRR,
            lastUpdated: new Date().toLocaleString()
        }

        await axios.post('/api', hunt);

        setStartDate("")
        setEndDate("")
        setMonthYear(0)
        setDays(0)
        setLeadCount(null)
        setExpectedDRR(null)

        alert('save successfully😀')
    }

    // handling Cancel
    const handleCancel = () => {
        setStartDate("")
        setEndDate("")
        setMonthYear(0)
        setDays(0)
        setLeadCount(null)
        setExpectedDRR(null)
    }

    return (
        <>
            <table className='table__container'>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Month/Year</th>
                        <th>Dates Excluded</th>
                        <th>Number of Days</th>
                        <th>Lead Count</th>
                        <th>Expected DRR</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>
                            <input
                                className='input__date'
                                type="date"
                                value={null}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className='input__date'
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </td>
                        <td>{!isNaN(monthYear) && monthYear}</td>
                        <td className='date__excluded'>
                            <input
                                readOnly
                                className='input__date'
                                type="text"
                                value={dateExcludes.map(date => date).join(', ')}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const datesArray = value.split(', ').filter(date => date.trim() !== '');
                                    setDateExcludes(datesArray);
                                }}
                            />

                            <input
                                className='excluded__dates'
                                type="date"
                                onChange={(e) => addExcludedDate(e.target.value)}
                                style={{ 'width': '70px' }}
                            />
                        </td>
                        <td>{days}</td>
                        <td>
                            <input className='input__date' type="text" value={leadCount} onChange={(e) => setLeadCount(e.target.value)} />
                        </td>
                        <td>
                            <input className='input__date' type="text" value={expectedDRR} onChange={(e) => setExpectedDRR(e.target.value)} />
                        </td>
                        <td className='btn'>
                            <button className='btn__save' onClick={handleSave}>Save</button>
                            <button className='btn__cancel' onClick={handleCancel}>🚫Cancel</button>
                        </td>
                    </tr>

                    {data.map((item) => (
                        <tr key={item._id}>
                            <td></td>
                            <td>{String(item._id).substring(item._id.length - 5)}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.monthYear}</td>
                            <td>{item.datesExcluded}</td>
                            <td>{item.numberOfDays}</td>
                            <td>{item.leadCount}</td>
                            <td>{item.expectedDRR}</td>
                            <td>{item.lastUpdated}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {data.length === 0 && <p style={{ 'color': 'red' }}>
                No data available
            </p>}
        </>

    );
};

export default Table;
