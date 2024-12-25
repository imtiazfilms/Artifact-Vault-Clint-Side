const Footer = () => {
    return (
        <div className="bg-base-300 pt-5 mt-5">
            <div className="bg-[#1d191a] rounded-full w-[100px] mx-auto">
                <img className="rounded-full" src="https://i.ibb.co.com/6DCx92j/Gemini-Generated-Image-977h7y977h7y977h.jpg" alt="" />
            </div>
            <footer className="footer p-10 pt-5 text-base-content">
                <div>
                    <h2 className="footer-title text-xl">ArtifactVault</h2>
                    <p>
                        Preserving history, one artifact at a time.
                        <br />
                        Explore, Learn, and Preserve.
                    </p>
                </div>
                <div>
                    <span className="footer-title">Quick Links</span>
                    <a className="link link-hover" href="/">Home</a>
                    <a className="link link-hover" href="/all-artifacts">All Artifacts</a>
                    <a className="link link-hover" href="/add-artifacts">Add Artifacts</a>
                    <a className="link link-hover" href="/contact">Contact Us</a>
                </div>
                <div>
                    <span className="footer-title">Contact</span>
                    <p>Tangail, Dhaka, Bangladesh</p>
                    <p>Email: imtiazahamed.angkur@gmail.com</p>
                    <p>Phone: +8801324204740</p>
                </div>
                <div>
                    <span className="footer-title">Follow Us</span>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" className="link link-hover">
                            <img src="https://i.ibb.co.com/QfDHwzW/icons8-facebook-logo-48.png" alt="" />
                        </a>
                        <a href="https://twitter.com" className="link link-hover">
                            <img src="https://i.ibb.co.com/bRbzy9y/icons8-twitter-logo-48.png" alt="" />
                        </a>
                        <a href="https://instagram.com" className="link link-hover">
                            <img src="https://i.ibb.co.com/Ttpw3sd/icons8-instagram-logo-48.png" alt="" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
