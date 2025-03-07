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
                To install Chords on your computer, follow the instructions in the README file on the GitHub repository.
                <br /><br />
                Chords supported: <br />
                - Major (6th/7th/9th)<br />
                - Minor (6th/7th/9th)<br />
                - Augmented (7th)<br />
                - Diminished (7th)<br />
                - Dominant 7th/9th <br />
                - Half Diminished 7th <br />
                - Major 7th Sharp 5th <br />
                - sus2 <br />
                - sus4 <br />
                - add2 <br />

                <br /><br />
                My personal website: <a href="https://finesite.org" target="_blank" rel="noreferrer">https://finesite.org</a> <br/>
                If you have any suggestions, questions, or feedback, please feel free to reach out to me.
            </p>

        </div>
    );
}

export default About;