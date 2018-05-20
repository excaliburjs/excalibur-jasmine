import { ExcaliburMatchers, ensureImagesLoaded } from "./matchers";

describe('Custom matcher: toEqualImage', () => {
    beforeAll(() => {
        jasmine.addMatchers(ExcaliburMatchers);
    });

    it('should exist', () => {
        expect(ExcaliburMatchers).toBeDefined();
    });

    it('can match equal dimensions images', (done) => {
        let image1 = document.createElement('img');
        let image2 = document.createElement('img');
        image1.width = 100;
        image1.height = 200;

        image2.width = 100;
        image2.height = 200;
        ensureImagesLoaded(image1, image2).then(([imageData1, imageData2]) => {
            expect(imageData1).toEqualImage(imageData2, .95);
            done();
        });
    });

    it('can negate match equal dimension images', (done) => {
        let image1 = document.createElement('img');
        let image2 = document.createElement('img');
        image1.width = 100;
        image1.height = 100;

        image2.width = 100;
        image2.height = 200;
        ensureImagesLoaded(image1, image2).then(([imageData1, imageData2])=> {
            expect(imageData1).not.toEqualImage(imageData2, .95)
            done();
        });

    });

    it('can match pixel by pixel images', (done) => {
        let image1 = document.createElement('img');
        let image2 = document.createElement('img');
        image1.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAYAAACBpyPiAAAACXBIWXMAAAhNAAAITQEhiCGBAAAByUlEQVRo3mP8//8/w1AFTAxDGIw6ftTxZACWweagkJAQvCXImjVrGAeV41etWlUPYysrK2NV8+zZs8EZ8qtWrWqAsd3c3LCqef/+/Wiap1tSERQUHLSOJ5hUCDl+NNnQKqm8evUKWaoBXS0jPRtmyGU4rqSipKQEZ1+5cgXOLigoYBxNNgOZVOiabKidVEaTzUAlFZonG1omldFkM1BJhSbJhl5JZWQlm0Nru+BJwi64rHEgkwrJyaYlWhSuqGbpa8aBTCrDP9kgJxUVGT7kWKjn5WJmMPQoGpCkQlSyQU4qHhYycPEdJ57A2WL2rXRPKiO3kkJOQp8GIKlQzfHncDgeLak00srxwzbZwKP7zpNPDdhCXvLPaTj7yXlEPPx69aqBTdqO5o4nuZJCLnmQAXIphFyR0RIMz2QzzV8UXkmxfvvDgJSE4GxtNTkkNhNKRcYmZcvAwMDAUNa9rpHuyaZPnw+rxDcddjg7zNcWe9t+82G6JKHhk2yOT2+vx6aIlZUVayl09ebDBkIlFd1KG1xJhZubG85OP/acEVsphAxGSxtKShtcSWUgkgfJyQZXUhlMYPgkG8uMSngyYGVjHfSOZxxd9TFAAACV193rbpOWXQAAAABJRU5ErkJggg==';
        image2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAYAAACBpyPiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACEwAAAhMAfPPw2UAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACYElEQVRoQ93UsWuTQRgG8IKgIAhFCnZwcnETsVOdRMRRKFlEMjZ2VZCsJwhiFYkUIgYKTqEkiKhrJheXbh0EdxcH/wAHPd83eMdz1+cT8313Sc7Ab/ge3u94cnnJirW2WDQsBQ1LQcNS0LAUNGTksyouivPiFJtJodVq2b/B2eDFKn+K3xXvxHtxW5xms3WMRiPjdLtdy7Tb7Sl8Lzikinw2xWfxS2jwTdwUJ9j8rPBmB4MB1el0pvC94JAq8rkuvgp9UD/FfXGSzc8qd/l10RffxQ+hv8JVUfvmq1YFC4/HY692eSUf/QK66/fEhmi0Mv9y25PJxGtUPrXiys+6KsPh0JPiRuF5weG5zXrbvV7Pi89Sx4KciivfZFWktHHY2ceC1FLfNqJhSsWVz7kqiIZN5bxtRMOmiis/r1VBNKxjXreNaFjH0pb/+GbXOJgvYlUQDWOP7qxZB/NF3DaiYay48rgqB90L1pEvYF5sn5vmi1gVREOFt324d9nDHAujnLeNaKiw5H9THlcIC89rVRANVVV5hOXndduIhqr08sbBVcHyH/rb3uunO97ug61sq4JoGHO/gMLyCGfi93OhYQyLseIKZ+L3c6Gh6t9aM86TG6vWwRU62r/mvX14xZMvYHR1FDs7FRqq55fOWAZv+MvBFoUz8bkp0VCx4gqLseIKZ+JzUwoePr18bBwsvLdx1pNC/l8IVwXhDJ6fWvCAhdGrzXUP56VccMsOzuQUPLDiqrjyuCpS2jg4L0X9eiCcySl4wPLuphXOLJPgoejy+G9zuP/Mw5llQsNS0LAMduU3CdWX7oe02LkAAAAASUVORK5CYII=';

        ensureImagesLoaded(image1, image2).then(([imageData1, imageData2])=> {
            expect(imageData1).toEqualImage(imageData2, .95)
            done();
        });
    });

    it('can negate match pixel by pixel images', (done) => {
        let image1 = document.createElement('img');
        let image2 = document.createElement('img');
        image1.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAYAAACBpyPiAAAACXBIWXMAAAhNAAAITQEhiCGBAAAByUlEQVRo3mP8//8/w1AFTAxDGIw6ftTxZACWweagkJAQvCXImjVrGAeV41etWlUPYysrK2NV8+zZs8EZ8qtWrWqAsd3c3LCqef/+/Wiap1tSERQUHLSOJ5hUCDl+NNnQKqm8evUKWaoBXS0jPRtmyGU4rqSipKQEZ1+5cgXOLigoYBxNNgOZVOiabKidVEaTzUAlFZonG1omldFkM1BJhSbJhl5JZWQlm0Nru+BJwi64rHEgkwrJyaYlWhSuqGbpa8aBTCrDP9kgJxUVGT7kWKjn5WJmMPQoGpCkQlSyQU4qHhYycPEdJ57A2WL2rXRPKiO3kkJOQp8GIKlQzfHncDgeLak00srxwzbZwKP7zpNPDdhCXvLPaTj7yXlEPPx69aqBTdqO5o4nuZJCLnmQAXIphFyR0RIMz2QzzV8UXkmxfvvDgJSE4GxtNTkkNhNKRcYmZcvAwMDAUNa9rpHuyaZPnw+rxDcddjg7zNcWe9t+82G6JKHhk2yOT2+vx6aIlZUVayl09ebDBkIlFd1KG1xJhZubG85OP/acEVsphAxGSxtKShtcSWUgkgfJyQZXUhlMYPgkG8uMSngyYGVjHfSOZxxd9TFAAACV193rbpOWXQAAAABJRU5ErkJggg==';
        image2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAYAAACBpyPiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACEwAAAhMAfPPw2UAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACYElEQVRoQ93UsWuTQRgG8IKgIAhFCnZwcnETsVOdRMRRKFlEMjZ2VZCsJwhiFYkUIgYKTqEkiKhrJheXbh0EdxcH/wAHPd83eMdz1+cT8313Sc7Ab/ge3u94cnnJirW2WDQsBQ1LQcNS0LAUNGTksyouivPiFJtJodVq2b/B2eDFKn+K3xXvxHtxW5xms3WMRiPjdLtdy7Tb7Sl8Lzikinw2xWfxS2jwTdwUJ9j8rPBmB4MB1el0pvC94JAq8rkuvgp9UD/FfXGSzc8qd/l10RffxQ+hv8JVUfvmq1YFC4/HY692eSUf/QK66/fEhmi0Mv9y25PJxGtUPrXiys+6KsPh0JPiRuF5weG5zXrbvV7Pi89Sx4KciivfZFWktHHY2ceC1FLfNqJhSsWVz7kqiIZN5bxtRMOmiis/r1VBNKxjXreNaFjH0pb/+GbXOJgvYlUQDWOP7qxZB/NF3DaiYay48rgqB90L1pEvYF5sn5vmi1gVREOFt324d9nDHAujnLeNaKiw5H9THlcIC89rVRANVVV5hOXndduIhqr08sbBVcHyH/rb3uunO97ug61sq4JoGHO/gMLyCGfi93OhYQyLseIKZ+L3c6Gh6t9aM86TG6vWwRU62r/mvX14xZMvYHR1FDs7FRqq55fOWAZv+MvBFoUz8bkp0VCx4gqLseIKZ+JzUwoePr18bBwsvLdx1pNC/l8IVwXhDJ6fWvCAhdGrzXUP56VccMsOzuQUPLDiqrjyuCpS2jg4L0X9eiCcySl4wPLuphXOLJPgoejy+G9zuP/Mw5llQsNS0LAMduU3CdWX7oe02LkAAAAASUVORK5CYII=';

        ensureImagesLoaded(image1, image2).then(([imageData1, imageData2])=> {
            expect(imageData1).not.toEqualImage(imageData2, .99)
            done();
        });
    });

    it('can load images from file', (done) => {
        let image1 = document.createElement('img');
        image1.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAYAAACBpyPiAAAACXBIWXMAAAhNAAAITQEhiCGBAAAByUlEQVRo3mP8//8/w1AFTAxDGIw6ftTxZACWweagkJAQvCXImjVrGAeV41etWlUPYysrK2NV8+zZs8EZ8qtWrWqAsd3c3LCqef/+/Wiap1tSERQUHLSOJ5hUCDl+NNnQKqm8evUKWaoBXS0jPRtmyGU4rqSipKQEZ1+5cgXOLigoYBxNNgOZVOiabKidVEaTzUAlFZonG1omldFkM1BJhSbJhl5JZWQlm0Nru+BJwi64rHEgkwrJyaYlWhSuqGbpa8aBTCrDP9kgJxUVGT7kWKjn5WJmMPQoGpCkQlSyQU4qHhYycPEdJ57A2WL2rXRPKiO3kkJOQp8GIKlQzfHncDgeLak00srxwzbZwKP7zpNPDdhCXvLPaTj7yXlEPPx69aqBTdqO5o4nuZJCLnmQAXIphFyR0RIMz2QzzV8UXkmxfvvDgJSE4GxtNTkkNhNKRcYmZcvAwMDAUNa9rpHuyaZPnw+rxDcddjg7zNcWe9t+82G6JKHhk2yOT2+vx6aIlZUVayl09ebDBkIlFd1KG1xJhZubG85OP/acEVsphAxGSxtKShtcSWUgkgfJyQZXUhlMYPgkG8uMSngyYGVjHfSOZxxd9TFAAACV193rbpOWXQAAAABJRU5ErkJggg==';
        
        ensureImagesLoaded('./test-images/working.png', image1).then(([imageData1, imageData2]) => {
            expect(imageData1).toEqualImage(imageData2, 1);
            done();
        });
    });

    it('can negate images from a file', (done) => {
        ensureImagesLoaded('./test-images/working.png', './test-images/busted.png').then(([imageData1, imageData2])=> {
            expect(imageData1).not.toEqualImage(imageData2, 1);
            done();
        });
    });
    
});