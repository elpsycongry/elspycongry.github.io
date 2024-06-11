import {
    Box, Dialog,
    DialogContent,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Link, Switch,
    Tooltip
} from "@mui/material";
import Header from "../fragment/header/header";
import Navbar from "../fragment/navbar/navbar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from '@mui/material/Pagination';
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import axios from "axios";
import './users.css'
import DialogUpdateUserForm from "./updateUser";
import DialogAddUserForm from "./addUser";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import swal from 'sweetalert';
import './blockUser.css';
import ReportIcon from '@mui/icons-material/Report';


export default function Users() {
    const [open, setOpen] = useState(false);
    const handleClickPracticeClose = () => {
        setOpen(false);
    }
    const [token, setToken] = useState("")
    const [listRoleSelect, setListRoleSelect] = useState([])
    const [listUser, setListUser] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const previousRolef = useRef('');
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
    });

    // mở modal user tương ứng
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idUserModal = queryParams.get('idUser');
    console.log(idUserModal)
    useEffect(() => {
        handleFilterWithFields(pagination);
        fetchListRoleSelect();
    }, [selectedRole, selectedState]);

    const listState = [
        {id: 1, text: "Đang chờ duyệt", name: "await"},
        {id: 2, text: "Đã duyệt và hoạt động", name: "action"},
        {id: 3, text: "Đã bị chặn", name: "block"}
    ]

    // const fetchListRoleSelect = async () => {
    const fetchListRoleSelect = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        setToken(user.accessToken)
        if (user != null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
            axios.get("http://localhost:8080/admin/users/role").then((res) => {
                setListRoleSelect(res.data);
            });
        }
    };

    const handleChangeSearch = (event) => {
        setSearchTerm(event.target.value);
        if (selectedRole !== "") {
            setPagination.page = 0;
        }
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        pagination.page = 0;
        handleFilterWithFields(pagination);

    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        pagination.page = 0;
        handleFilterWithFields(pagination);
    }

    const handlePageChange = (event, value) => {
        setPagination(prev => {
            const newPagination = {...prev, page: value - 1};
            handleFilterWithFields(newPagination);
            return newPagination;
        });

    };

    const handleFilterWithFields = async (newPagination = pagination) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user != null) {
            try {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                axios.get(`http://localhost:8080/admin/users/filterWithFields?page=${newPagination.page}&size=${newPagination.size}&keyword=${searchTerm}&role_id=${selectedRole}&state=${selectedState}`)
                    .then((res) => {
                        setListUser(res.data.content);
                        setPagination({
                            ...newPagination,
                            totalElements: res.data.totalElements,
                        });
                    });

            } catch (error) {
                console.log(error);
            }
        }
    };

    const blockUserWithId = async (userId, isBlocked, userState) => {
        if (userState === true) {
            swal({
                title: "Bạn có chắc chắn?",
                text: isBlocked ? "Người dùng không thực hiện bất kỳ tác vụ nào!" : "Người dùng sẽ có thể thực hiện các tác vụ!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    try {
                        const user = JSON.parse(localStorage.getItem("currentUser"));
                        if (user != null) {
                            axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                            await axios.post(`http://localhost:8080/admin/block/${userId}`, {isBlocked});
                            handleFilterWithFields();
                            swal(isBlocked ? "Đã chặn quyền truy cập người dùng!" : "Đã bỏ chặn quyền truy cập người dùng!", {
                                icon: "success",
                                dangerMode: true
                            });
                        }
                    } catch (error) {
                        console.log(error);
                        swal("Đã xảy ra lỗi khi xử lý yêu cầu!", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("Không có thay đổi nào được lưu!");
                }
            });
        } else {
            swal("Người dùng chưa được cấp quyền truy cập!", {
                icon: "error",
            });
        }

    };

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="/public">
                    Quản lý đào tạo
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <>
            <Header/>
            <Navbar/>
            <Box component="main" sx={{
                flexGrow: 1,
                p: 2,
                marginTop: '57px',
                marginLeft: '64px',
                bgcolor: 'rgb(231, 227, 227)',
                width: '95.9%'
            }}>
                <div style={{display: 'flex'}}>
                    <div>
                        <Box m={2} style={{display: 'flex', marginBottom: '8px', marginTop: '10px'}}>
                            <GroupIcon style={{paddingBottom: '3px', color: 'rgba(0, 0, 0, 0.60)'}}/>
                            <p style={{
                                color: 'rgba(0, 0, 0, 0.60)',
                                marginLeft: '10px',
                                marginBottom: '0px',
                                fontFamily: 'sans-serif',
                                fontWeight: '550',
                            }}>Quản lý người dùng</p>
                        </Box>
                        <div style={{marginTop: '-7px'}}
                             className=" d-flex align-items-centent justify-content-between pl-15">
                            <p className="title text-center mb-0">
                                Quản lý người dùng
                            </p>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClickPracticeClose}
                        >
                            <DialogContent sx={{
                                p: 0,
                                position: 'relative'
                            }}>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}
                                    onClick={handleClickPracticeClose}
                                >
                                    <ClearIcon/>
                                </IconButton>
                            </DialogContent>
                        </Dialog>
                        <div className=" mt-3">
                            <div className="d-flex justify-content-between">
                                <div style={{marginTop: '-10px'}} className="d-flex">
                                    <div className="search-input position-relative">
                                        <input
                                            type="text"
                                            className="w-px position-relative input-username-email"
                                            style={{width: '300px'}}
                                            value={searchTerm}
                                            onChange={handleChangeSearch}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleFilterWithFields();
                                                }
                                            }}
                                            placeholder="Tìm kiếm với tên hoặc email..."
                                        />
                                        <svg className="search-icon position-absolute"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="rgb(131 125 125 / 87%)"
                                                  d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/>
                                        </svg>
                                    </div>
                                    <FormControl className="select-form ml-10 status" sx={{minWidth: '300px'}}>
                                        <InputLabel className="top-left" id="demo-simple-small-label">
                                            Vai trò...</InputLabel>
                                        <Select
                                            sx={{backgroundColor: 'white'}}
                                            labelId="demo-simple-small-label"
                                            className="select-edit"
                                            id="demo-simple-select"
                                            label="Vai trò..."
                                            value={selectedRole}
                                            onChange={handleRoleChange}
                                        >
                                            <MenuItem value={""}>Tất cả</MenuItem>
                                            {listRoleSelect.map(item => (
                                                <MenuItem value={item.id} key={item.id}>{item.display_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className="select-form ml-10 status" sx={{minWidth: '300px'}}>
                                        <InputLabel className="top-left" id="demo-simple-small-label">Trạng thái người
                                            dùng...</InputLabel>
                                        <Select
                                            sx={{backgroundColor: 'white'}}
                                            labelId="demo-simple-small-label"
                                            className="select-edit "
                                            id="demo-simple-select"
                                            label="Trạng thái thực tập..."
                                            value={selectedState}
                                            onChange={handleStateChange}
                                        >

                                            <MenuItem value={""}>Tất cả</MenuItem>
                                            {listState.map(item => (
                                                <MenuItem value={item.name} key={item.id}>{item.text}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative" style={{width: '1165px'}}>
                        <DialogAddUserForm token={token} onAdd={handleFilterWithFields}/>
                    </div>
                </div>
                <div className="content-recruiment position-relative"
                     style={{borderRadius: '10px', marginTop: '20px', minHeight: '650px'}}>
                    <div className="table-container-user"
                         style={{display: 'flex', justifyContent: 'center', marginBottom: '40px', height: '520px'}}>
                        <div className="table-user">

                            <thead style={{marginTop: '-20px'}}>
                            <tr className="grey-text">
                                <th className="user-id">STT</th>
                                <th className="user-name" style={{padding: '8px'}}>Tên</th>
                                <th className="user-email">Email</th>
                                <th className="user-roles">Vai trò</th>
                                <th className="user-actions">Trạng thái</th>
                                <th className="user-actions">Hành động</th>
                            </tr>
                            </thead>

                            <tbody style={{marginTop: '-15px'}}>
                            {listUser.map((item, index) => (
                                <tr className="grey-text count-tr" key={item.id}>
                                    <td className="user-id">{index + 1 + pagination.page * pagination.size}</td>
                                    <td style={{padding: '8px'}}>
                                        <Tooltip title={item.status ? "Đã cấp quyền" : "Chờ xác nhận"}
                                                 placement="right-end" arrow>
                                            {item.state === true ? (
                                                <span> {item.name}</span>
                                            ) : (
                                                <span style={{color: '#ec9d00'}}>
                                                        {item.name}
                                                    </span>
                                            )}
                                        </Tooltip>
                                    </td>
                                    <td>{item.email}</td>
                                    <td className="user-roles">
                                        {item.roles && item.roles.length > 0 ? (
                                            item.roles.length === 4 ? (
                                                'Tất cả quyền quản lý'
                                            ) : (
                                                item.roles.map((role, index) => (
                                                    <label key={role.id} style={{paddingRight: '5px'}}>
                                                        {role.display_name}{index !== item.roles.length - 1 ? ', ' : ''}
                                                    </label>
                                                ))
                                            )
                                        ) : (
                                            "Đang chờ phê duyệt"
                                        )}
                                    </td>
                                    <td>
                                        {item.state === true ? (""
                                        ) : (
                                            <ReportIcon style={{
                                                width: "32px",
                                                height: "32px",
                                                color: '#ec9d00',
                                                borderRadius: "100%",
                                                fontSize: "24px",
                                                marginRight: "8px"
                                            }}
                                            />
                                        )}
                                        <ToggleButton
                                            value="check"
                                            selected={item.status}
                                            onClick={() => blockUserWithId(item.id, item.status, item.state)}
                                            style={{
                                                backgroundColor: item.status && item.state ? "green" : "red",
                                                color: "white",
                                                marginLeft: "5px",
                                                width: "10px",
                                                height: "10px",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            {item.status && item.state ? <CheckIcon/> :
                                                <CloseIcon sx={{bgcolor: 'red', borderRadius: '100%'}}/>}
                                        </ToggleButton>

                                    </td>
                                    <td className="user-actions">
                                        <DialogUpdateUserForm token={token} userId={item.id}
                                                              onUpdate={handleFilterWithFields}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </div>
                    </div>

                    <div className="position-absolute w-100" style={{bottom: '12px'}}>
                        <Pagination
                            className="d-flex justify-content-center "
                            count={Math.ceil(pagination.totalElements / pagination.size)}
                            page={pagination.page + 1}
                            onChange={handlePageChange}
                        />
                    </div>


                </div>
            </Box>
            <div style={{
                paddingTop: '30px',
                paddingBottom: '0px',
                width: '100%',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Copyright sx={{maxWidth: '100%'}}/>
            </div>
            {idUserModal != null && idUserModal !== "1" && (
                <DialogUpdateUserForm token={token} userId={idUserModal} defaultOpen onUpdate={handleFilterWithFields}/>
            )}
        </>
    );
}