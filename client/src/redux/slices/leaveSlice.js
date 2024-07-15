import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leave: localStorage.getItem("leaveInfo")
    ? JSON.parse(localStorage.getItem("leaveInfo"))
    : null,
  records: [],
  approvalRequests: [],
  totalLeaveBalance: 17, 
  formData: {
    startDate: "",
    endDate: "",
    leaveType: "paid",
    approver: "",
    reason: "",
    totalDays: 0,
  },
  totalDays: 0,
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setLeaveInfo: (state, action) => {
      state.leave = action.payload;
      localStorage.setItem("leaveInfo", JSON.stringify(action.payload));
    },
    addLeaveRecord: (state, action) => {
      state.records.push(action.payload);
    },
    addApprovalRequest: (state, action) => {
      state.approvalRequests.push(action.payload);
    },
    removeLeaveRecord: (state, action) => {
      state.records = state.records.filter(
        (record) => record._id !== action.payload
      );
    },
    approveLeave: (state, action) => {
      const index = state.approvalRequests.findIndex(
        (request) => request._id === action.payload
      );
      if (index !== -1) {
        state.approvalRequests[index].status = "approved";
        // Optionally, trigger an API call to update the status in your backend
      }
    },
    rejectLeave: (state, action) => {
      const index = state.approvalRequests.findIndex(
        (request) => request._id === action.payload
      );
      if (index !== -1) {
        state.approvalRequests[index].status = "rejected";
        // Optionally, trigger an API call to update the status in your backend
      }
    },
    updateLeaveBalance: (state, action) => {
      state.totalLeaveBalance = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {
        startDate: "",
        endDate: "",
        leaveType: "paid",
        approver: "",
        reason: "",
        totalDays: 0,
      };
    },
    updateTotalDays: (state, action) => {
      state.totalDays = action.payload;
    },
    logout: (state, action) => {
      state.leave = null;
      localStorage.removeItem("leaveInfo");
    },
  },
});

export const {
  setLeaveInfo,
  addLeaveRecord,
  addApprovalRequest,
  removeLeaveRecord,
  approveLeave,
  rejectLeave,
  updateLeaveBalance,
  updateFormData,
  resetFormData,
  updateTotalDays,
  logout,
} = leaveSlice.actions;

export default leaveSlice.reducer;
