async function loadCv() {
  try {
    const response = await fetch('cv_data.json'); //Hämtar JSON-data från filen 'cv-data.json' med fetch-API.

    //Kollar om fetch-anropet var lyckat
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //Om anropet är lyckas konverteras JSON-responsen till ett JavaScript-objekt.
    const data = await response.json();

    const personligInformation = `
    <div class="personlig-information">
        <ul>
            <li><strong>Namn:</strong> ${data.personligInformation.namn}</li>
            <li><strong>Ålder:</strong> ${data.personligInformation.ålder}</li>
            <li><strong>Email:</strong> ${data.personligInformation.email}</li>
            <li><strong>Telefonnr:</strong> ${data.personligInformation.telefonnummer}</li>
        </ul>
    </div>
`;

    const styrkor = `
    <div class="styrkor">
        <ul>
            ${data.styrkor.map((styrka) => `<li>${styrka}</li>`).join('')}
        </ul>
    </div>
`;

    document.getElementById('personlig-information').innerHTML =
      personligInformation;
    document.getElementById('styrkor').innerHTML = styrkor;

    //Genererar HTML för arbetsplatser baserat på datan från JSON.
    const arbetsplatser = data.arbetsplatser
      .map(
        (arbetsplats) =>
          `
                <div class="arbetsplats">
                  <ul>
                      <li> <Strong>Arbetsgivare:</Strong> ${arbetsplats.arbetsgivare} </li>
                      <li> <Strong>Titel:</Strong> ${arbetsplats.titel} </li>
                      <li> <Strong>Beskrivning:</Strong> ${arbetsplats.beskrivning} </li>
                      <li> <Strong>Period:</Strong> ${arbetsplats.period} </li>
                      </ul>
                      </div>
                      `
      )
      .join('');

    //Genererar HTML för utbildningar baserat på datan från JSON.
    const utbildningarRubrik = `<h1> Utbildningar </h1>`;
    const utbildningar = data.utbildningar
      .map(
        (utbildning) =>
          `
                  <div class="utbildning">
                      <ul>
                          <li> <Strong>Utbilning:</Strong> ${utbildning.titel} </li>
                          <li> <Strong>Skola:</Strong> ${utbildning.skola} </li>
                          <li> <Strong>Period:</Strong> ${utbildning.period} </li>
                      </ul>
                  </div>
                  `
      )
      .join('');

    // Lägg in genererad HTML för arbetsplatser och utbildningar i sina respektive element på sidan
    document.getElementById('arbetsplatser').innerHTML = arbetsplatser;
    document.getElementById('utbildningar').innerHTML = utbildningar;
  } catch (error) {
    // Om det uppstår ett fel, logga felet och visa felmeddelandet på sidan
    console.error('Error loading the JSON file', error);
    document.getElementById('data').innerHTML =
      'Fel vid laddning av JSON-fil: ' + error.message;
  }
}
