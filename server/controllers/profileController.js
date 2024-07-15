import Employee from "../models/EmployeeModel.js";




export const createEmployee = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      name,
      gender,
      dateOfBirth,
      nationality,
      email,
      workInformation,
      personalInformation,
      contactDetails,
      bankInformation,
      hierarchyInformation,
      identityInformation
    } = req.body;

    if (!name || !gender || !dateOfBirth || !nationality || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }



    const newEmployee = new Employee({
      userId,
      name,
      gender,
      dateOfBirth,
      nationality,
      email,
      workInformation,
      personalInformation,
      contactDetails,
      bankInformation,
      hierarchyInformation,
      identityInformation,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const fetchEmployee = async (req, res) => {
  try {
    const { userId } = req.user;

    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      name,
      gender,
      dateOfBirth,
      nationality,
      email,
      workInformation,
      personalInformation,
      contactDetails,
      bankInformation,
      hierarchyInformation,
      identityInformation,
    } = req.body;

    if (!name || !gender || !dateOfBirth || !nationality || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { userId },
      {
        name,
        gender,
        dateOfBirth,
        nationality,
        email,
        workInformation,
        personalInformation,
        contactDetails,
        bankInformation,
        hierarchyInformation,
        identityInformation,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

