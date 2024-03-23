import Page from "../../Page";

export default class PersonaSelector extends Page {
    private data: any;
    public static base_url: string = "";
    constructor(data: any, base_url?: string) {
        super(base_url || PersonaSelector.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // Persona Selector PAGE
        this.router.get("/", async (req: any, res: any) => {
            this.data.server.next.render(req, res, '/Authentication/PersonaSelectionPage', {});
        });
    }
}