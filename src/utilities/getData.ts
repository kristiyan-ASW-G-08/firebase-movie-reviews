const getData = async (resource: string, query?: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3${resource}?api_key=${process.env.REACT_APP_TMDB}`,
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export default getData;
