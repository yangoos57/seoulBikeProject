import React, { useState, useEffect, Component } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import axios from "axios";

const SelectCustom = (props) => {
	// 1000개 이상일 경우 매우 느리기 때문에 이런 방법을 써야한다고 함..
	// dropdown Data
	const days = [
		{ value: 9999, label: "All" },
		{ value: 0, label: "Mon" },
		{ value: 1, label: "Tues" },
		{ value: 2, label: "Wends" },
		{ value: 3, label: "Thurs" },
		{ value: 4, label: "Fri" },
		{ value: 5, label: "Sat" },
		{ value: 6, label: "Sun" },
	];

	const months = [
		{ value: 9999, label: "전체" },
		{ value: 1, label: "1월" },
		{ value: 2, label: "2월" },
		{ value: 3, label: "3월" },
		{ value: 4, label: "4월" },
		{ value: 5, label: "5월" },
		{ value: 6, label: "6월" },
		{ value: 7, label: "7월" },
		{ value: 8, label: "8월" },
		{ value: 9, label: "9월" },
		{ value: 10, label: "10월" },
		{ value: 11, label: "11월" },
		{ value: 12, label: "12월" },
	];

	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios.get("http://127.0.0.1:8000/api/selectorOptions/").then((response) => {
			console.log(response);
			setUsers(response.data);
		});
	}, []);

	const height = 35;

	class MenuList extends Component {
		render() {
			const { options, children, maxHeight, getValue } = this.props;
			const [value] = getValue();
			const initialOffset = options.indexOf(value) * height;

			return (
				<List height={maxHeight} itemCount={children.length} itemSize={height} initialScrollOffset={initialOffset}>
					{({ index, style }) => <div style={style}>{children[index]}</div>}
				</List>
			);
		}
	}

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			borderBottom: "1px dotted pink",
			color: state.isSelected ? "black" : "gray",
			fontSize: 16,
			// backgroundColor : 'black'
		}),
		control: (styles) => ({ ...styles, backgroundColor: "transparent", border: 0 }),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = "opacity 300ms";

			return { ...provided, opacity, transition };
		},
	};

    // console.log(dropdown[key])

	return (
		<div>
			<Select options={days} styles={customStyles} components={{ MenuList }} />
		</div>
	);
};

export default SelectCustom;
