import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <h1>About</h1>
            <p className="roboto-font about-text">
                Chords is an online chord detection application developed by Peter Ju.
                <br /><br />
                To Use Chords, connect your MIDI device to your computer and navigate to the Devices page to select your MIDI device. Once you have selected your MIDI device, navigate to the Home page to start playing notes on your MIDI device. Chords will detect the notes you play and display the chord you are playing.
                <br /><br />
                To install Chords on your computer, follow the instructions in the README file in the GitHub repository.
                <br />
                <br />
                My personal website: <a href="https://finesite.org" target="_blank" rel="noreferrer">https://finesite.org</a> <br/>
                If you have any suggestions, questions, or feedback, please feel free to reach out to me.
            </p>

        </div>
    );
}

export default About;