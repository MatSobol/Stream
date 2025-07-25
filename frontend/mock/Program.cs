var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

string[] images = new string[]
{
    "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg"
};

const string icon = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png";
const string video = "https://www.youtube.com/embed/u31qwQUeGuM?autoplay=1&mute=1";

VideoItem[] videos = new[]
{
    new VideoItem("Cat", images[0], video, icon),
    new VideoItem("Puppy", images[1], video, icon),
    new VideoItem("Dog", images[2], video, icon)
};

var random = new Random();

app.MapGet("/images", async (int start, int count) =>
{
    if (start < 0) start = 0;
    if (count < 1) count = 1;

    VideoItem[] elements = new VideoItem[count];
    for (int i = 0; i < count; i++)
    {
        int randomIndex = random.Next(videos.Length);
        elements[i] = videos[randomIndex];
    }

    return Results.Ok(elements);
})
.WithOpenApi();

app.Run();

public class VideoItem
{
    public string Title { get; set; }
    public string Image { get; set; }
    public string PreviewUrl { get; set; }
    public string Icon { get; set; }

    public VideoItem(string title, string image, string previewUrl, string icon)
    {
        Title = title;
        Image = image;
        PreviewUrl = previewUrl;
        Icon = icon;
    }
};