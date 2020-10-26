export const listSkills = async () => {
    const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
export const detSkills = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}